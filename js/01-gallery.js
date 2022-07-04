import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryRef = document.querySelector(".gallery");
const transformResult = galleryItemTransform(galleryItems);

galleryRef.insertAdjacentHTML("beforeend", transformResult);

galleryRef.addEventListener("click", onImgClick);

function galleryItemTransform(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}

function onImgClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG") {
    return;
  }
  const instance = basicLightbox.create(
    `
    <img src="${evt.target.dataset.source}" width="800" height="600">
`,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", onModalOpen);
      },

      onClose: (instance) => {
        document.removeEventListener("keydown", onModalOpen);
      },
    }
  );

  function onModalOpen(evt) {
    if (evt.key === "Escape") {
      instance.close();
    }
  }
  instance.show();
}
