import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
// Рендер розмітки
const cardsMarkup = createCardsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);

// Додавання обробника подій
galleryContainer.addEventListener('click', onImageClick);

// // Створення звичайної розмітки
// function createCardsMarkup(array) {
// 	return array
// 		.map(
// 			({ original, preview, description }) =>
// 				`<div class="gallery__item">
//           <a class="gallery__link" href="${original}">
//             <img
//               class="gallery__image"
//               src="${preview}"
//               data-source="${original}"
//               alt="${description}"
//             />
//           </a>
//         </div>`
// 		)
// 		.join('');
// }

// Створення розмітки з урахуванням вимог лінивого завантаження
function createCardsMarkup(array) {
	return array
		.map(
			({ original, preview, description }) =>
				`<div class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              loading="lazy"
              class="gallery__image lazyload"
              data-src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </div>`
		)
		.join('');
}

// Реалізація лінивого завантаження
if ('loading' in HTMLImageElement.prototype) {
	console.log('yes');

	const lazyImages = document.querySelectorAll('img[loading="lazy"]');

	lazyImages.forEach(img => {
		img.src = img.dataset.src;
	});
} else {
	const script = document.createElement('script');
	script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
	script.integrity =
		'sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==';
	script.crossorigin = 'anonymous';
	script.referrerpolicy = 'no-referrer';
	document.body.appendChild(script);
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

// Віріант 2, працює

// // Відкриття модалки
// function onImageClick(e) {
// 	e.preventDefault();

// 	const isImageEl = e.target.classList.contains('gallery__image');

// 	if (!isImageEl) {
// 		return;
// 	}
// 	createModalImg(e);
// }

// let modalEl;

// function createModalImg(e) {
// 	modalEl = basicLightbox.create(
// 		`<img src="${e.target.dataset.source}" width="800" height="600">`,
// 		{
// 			onShow: modalEl => {
// 				addEventListener('keydown', onEscapePress);
// 			},

// 			onClose: modalEl => {
// 				removeEventListener('keydown', onEscapePress);
// 			},
// 		}
// 	);
// 	modalEl.show();
// }

// // Закриття модалки натисканням Escape
// function onEscapePress(e) {
// 	if (e.code !== 'Escape') {
// 		return;
// 	}
// 	modalEl.close();
// }
