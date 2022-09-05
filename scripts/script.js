"use strict";

const dataBase = JSON.parse(localStorage.getItem("awito")) || [];
console.log(dataBase);

const modalAdd = document.querySelector(".modal__add"),
  addAd = document.querySelector(".add__ad"),
  modalBtnSubmit = document.querySelector(".modal__btn-submit"),
  modalSubmit = document.querySelector(".modal__submit"),
  catalog = document.querySelector(".catalog"),
  modalItem = document.querySelector(".modal__item"),
  modalBtnWarning = document.querySelector(".modal__btn-warning"),
  modalFileInput = document.querySelector(".modal__file-input"),
  modalFileBtn = document.querySelector(".modal__file-btn"),
  modalImageAdd = document.querySelector(".modal__image-add");

const elementsModalSubmit = [...modalSubmit.elements].filter(
  (elem) => elem.tagName !== "BUTTON" && elem.type !== "submit"
);

const infoFoto = {};

const saveDB = () => localStorage.setItem("awito", JSON.stringify(dataBase));

const checkForm = () => {
  const validForm = elementsModalSubmit.every((elem) => elem.value);
  modalBtnSubmit.disabled = !validForm;
  modalBtnWarning.style.display = validForm ? "none" : "";
};

const closeModal = (event) => {
  const target = event.target;

  if (
    target.closest(".modal__close") ||
    target.classList.contains("modal") ||
    event.key === "Escape"
  ) {
    modalAdd.classList.add("hide");
    modalItem.classList.add("hide");
    modalSubmit.reset();
    document.removeEventListener("keydown", closeModal);
    checkForm();
  }
};

modalFileInput.addEventListener("change", (event) => {
  const target = event.target;

  const reader = new FileReader();

  const file = target.files[0];

  infoFoto.fileName = file.name;
  infoFoto.size = file.size;

  reader.readAsBinaryString(file);

  reader.addEventListener("load", (event) => {
    if (infoFoto.size < 200000) {
      modalFileBtn.textContent = infoFoto.fileName;
      infoFoto.base64 = btoa(event.target.result);
      modalImageAdd.src = `data:image/jpeg;base64,${infoFoto.base64}`;
    } else {
      modalFileBtn.textContent = "файл нe должен превышать 200кБ";
    }
  });
});

modalSubmit.addEventListener("input", checkForm);

modalSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  const itemObj = {};
  for (const elem of elementsModalSubmit) {
    itemObj[elem.name] = elem.value;
  }
  itemObj.image = infoFoto.base64;
  dataBase.push(itemObj);
  modalSubmit.reset();
  closeModal({ target: modalAdd });
  saveDB();
});

addAd.addEventListener("click", () => {
  modalAdd.classList.remove("hide");
  modalBtnSubmit.disabled = true;
  document.addEventListener("keydown", closeModal);
});

catalog.addEventListener("click", (event) => {
  const target = event.target;
  if (target.closest(".card")) modalItem.classList.remove("hide");
  document.addEventListener("keydown", closeModal);
});

modalAdd.addEventListener("click", closeModal);
modalItem.addEventListener("click", closeModal);
