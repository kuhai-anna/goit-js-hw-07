import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
// Рендер розмітки
const cardsMarkup = createCardsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);

// Створення розмітки з урахуванням вимог лінивого завантаження
function createCardsMarkup(array) {
	return array
		.map(
			({ original, preview, description }) =>
				`<a class="gallery__item" href="${original}">
          <img loading="lazy" data-src="${preview}" class="gallery__image lazyload" src="${preview}" alt="${description}" />
        </a>`
		)
		.join('');
}

// Створення модалки
new SimpleLightbox('.gallery a', {
	captionsData: 'alt',
	captionDelay: 250,
});

// Реалізація лінивого завантаження
// В Safari працює, а в Chrome - ні
if ('loading' in HTMLImageElement.prototype) {
	const lazyImages = document.querySelectorAll('img[loading="lazy"]');

	lazyImages.forEach(img => {
		img.src = img.dataset.src;
		img.width = '372';
		img.height = '240';
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
