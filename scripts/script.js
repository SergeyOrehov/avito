"use strict";

const modalAdd = document.querySelector(".modal__add"),
  addAd = document.querySelector(".add__ad"),
  modalBtnSubmit = document.querySelector(".modal__btn-submit"),
  modalSubmit = document.querySelector(".modal__submit"),
  catalog = document.querySelector(".catalog"),
  modalItem = document.querySelector(".modal__item");

const elementsModalSubmit = [...modalSubmit.elements].filter(
  (elem) => elem.tagName !== "BUTTON"
);

const closeModalEsc = (event) => {
  if (event.key === "Escape") {
    modalAdd.classList.add("hide");
    modalItem.classList.add("hide");
    modalSubmit.reset();
    document.removeEventListener("keydown", closeModalEsc);
  }
};

const closeModal = function (event) {
  const target = event.target;

  if (target.closest(".modal__close") || target === this) {
    this.classList.add("hide");
    modalSubmit.reset();
  }
};

addAd.addEventListener("click", () => {
  modalAdd.classList.remove("hide");
  modalBtnSubmit.disabled = true;
  document.addEventListener("keydown", closeModalEsc);
});

catalog.addEventListener("click", (event) => {
  const target = event.target;
  if (target.closest(".card")) modalItem.classList.remove("hide");
  document.addEventListener("keydown", closeModalEsc);
});

modalAdd.addEventListener("click", closeModal);
modalItem.addEventListener("click", closeModal);
