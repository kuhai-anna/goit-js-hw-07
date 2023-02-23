import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
// Рендер розмітки
const cardsMarkup = createCardsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);

// Додавання обробника подій
galleryContainer.addEventListener('click', onImageClick);

// Створення розмітки
function createCardsMarkup(array) {
	return array
		.map(
			({ original, preview, description }) =>
				`<div class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </div>`
		)
		.join('');
}

// Відкриття модалки
function onImageClick(e) {
	e.preventDefault();

	const isImageEl = e.target.classList.contains('gallery__image');

	if (!isImageEl) {
		return;
	}
	createModalImg(e).show();
	addEventListener('keydown', onEscapePress);
}

// Створення модального вікна з відповідним зображенням
function createModalImg(e) {
	return basicLightbox.create(`
    <img src="${e.target.dataset.source}" width="800" height="600">
`);
}

// Закриття модалки натисканням Escape
function onEscapePress(e) {
	if (e.code !== 'Escape') {
		return;
	}
	createModalImg(e).close(() => console.log('lightbox not visible anymore'));
	removeEventListener('keydown', onEscapePress);
}

// Реалізація лінивого завантаження

// // Відкриття модалки
// function onImageClick(e) {
// 	e.preventDefault();

// 	const isImageEl = e.target.classList.contains('gallery__image');

// 	if (!isImageEl) {
// 		return;
// 	}

// 	createModalImg(e);
// }

// let instance;

// function createModalImg(e) {
// 	instance = basicLightbox.create(
// 		`<img src="${e.target.dataset.source}" width="800" height="600">`,
// 		{
// 			onShow: () => {
// 				addEventListener('keydown', onEscapePress);
// 			},

// 			onClose: () => {
// 				removeEventListener('keydown', onEscapePress);
// 			},
// 		}
// 	);
// 	instance.show();
// }

// // Закриття модалки натисканням Escape
// function onEscapePress(e) {
// 	if (e.code !== 'Escape') {
// 		return;
// 	}
// 	instance.close();
// }

// // Реалізація лінивого завантаження
