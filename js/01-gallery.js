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
}

// Створення модального вікна з відповідним зображенням
function createModalImg(e) {
	return basicLightbox.create(`<img src="${e.target.dataset.source}" width="800" height="600">`, {
		onShow: () => {
			addEventListener('keydown', onEscapePress);
		},

		onClose: () => {
			removeEventListener('keydown', onEscapePress);
		},
	});
}

// Закриття модалки натисканням Escape
function onEscapePress(e) {
	if (e.code !== 'Escape') {
		return;
	}
	createModalImg(e).close(() => console.log('lightbox not visible anymore'));
}

// Реалізація лінивого завантаження

// Віріант 2, працює

// // Відкриття модалки
// function onImageClick(e) {
// 	e.preventDefault();

// 	const isImageEl = e.target.classList.contains('gallery__image');

// 	if (!isImageEl) {
// 		return;
// 	}

// 	createModalImg(e).show();
// }

// let modalEl;

// function createModalImg(e) {
// 	return basicLightbox.create(`<img src="${e.target.dataset.source}" width="800" height="600">`, {
// 		onShow: () => {
// 			addEventListener('keydown', onEscapePress);
// 		},

// 		onClose: () => {
// 			removeEventListener('keydown', onEscapePress);
// 		},
// 	});
// 	// modalEl = basicLightbox.create(
// 	// 	`<img src="${e.target.dataset.source}" width="800" height="600">`,
// 	// 	{
// 	// 		onShow: () => {
// 	// 			addEventListener('keydown', onEscapePress);
// 	// 		},

// 	// 		onClose: () => {
// 	// 			removeEventListener('keydown', onEscapePress);
// 	// 		},
// 	// 	}
// 	// );
// 	// modalEl.show();
// }

// // Закриття модалки натисканням Escape
// function onEscapePress(e) {
// 	if (e.code !== 'Escape') {
// 		return;
// 	}
// 	createModalImg(e).close(() => console.log('lightbox not visible anymore'));
// 	// createModalImg(e).close();
// }

// Віріант 3, не працює

// Відкриття модалки
// function onImageClick(e) {
// 	e.preventDefault();

// 	const isImageEl = e.target.classList.contains('gallery__image');

// 	if (!isImageEl) {
// 		return;
// 	}

// 	createModalImg(e).show();
// }

// let modalEl;

// function createModalImg(e) {
// 	return basicLightbox.create(`<img src="${e.target.dataset.source}" width="800" height="600">`, {
// 		onShow: () => {
// 			addEventListener('keydown', onEscapePress);
// 		},

// 		onClose: () => {
// 			removeEventListener('keydown', onEscapePress);
// 		},
// 	});
// }

// // Закриття модалки натисканням Escape
// function onEscapePress(e) {
// 	if (e.code !== 'Escape') {
// 		return;
// 	}
// 	createModalImg(e).close(() => console.log('lightbox not visible anymore'));
// }
