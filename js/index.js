// import imagesRef from './gallery-items.js';

// console.log(imagesRef);

const imagesRef= [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  jsGalleryList: document.querySelector('.js-gallery'),
  modalOpenBox: document.querySelector('div.lightbox'),
  ModalImage: document.querySelector('img.lightbox__image'),
  onModalCloseBtn: document.querySelector('.lightbox__button'),
};

const galleryItemsMarkUp = createGalleryCard(imagesRef);
refs.jsGalleryList.insertAdjacentHTML('beforeend', galleryItemsMarkUp);


function createGalleryCard(imagesRef) {
  const galleryMarkUp = imagesRef.map(({ preview, original, description }, index) => {
    return`<li class="gallery__item">
  <a
    class="gallery__link"
    
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      data-index = "${index}"
    />
  </a>
</li>
`;
  }).join('');

  return galleryMarkUp;
}

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
refs.jsGalleryList.addEventListener('click', onModalImage)
function onModalImage(event) {
  event.preventDefault();
  const eventTarget = event.target
  if (eventTarget.nodeName !== 'IMG') {
    return;
  }
  refs.modalOpenBox.classList.add('is-open');
  refs.ModalImage.src = eventTarget.dataset.source;
  refs.ModalImage.dataset.index = eventTarget.dataset.index;
  console.log(eventTarget.dataset.source); 
}

refs.onModalCloseBtn.addEventListener('click', closeModalBtn)

function closeModalBtn(event) {
  refs.modalOpenBox.classList.remove('is-open');
  refs.ModalImage.src ="";
}


window.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
        refs.modalOpenBox.classList.remove('is-open');
          refs.ModalImage.src ="";
    };
    
    if (event.key === 'ArrowLeft') {
        arrowLeft()
    };

    if (event.key === 'ArrowRight') {
        arrowRight()
    }
    console.log(event.key);
})

function setNewSrc(step, index) {
  refs.ModalImage.dataset.index = `${index + step}`
  refs.ModalImage.src = imagesRef[index + step].original
}

function arrowLeft() {
  let index = +refs.ModalImage.dataset.index
  console.log(index);
  
  if (index === 0) {
    setNewSrc(0, imagesRef.length - 1)
    return
  }

  console.log(index);
  setNewSrc(-1, index);
}


function arrowRight() {
  let index = +refs.ModalImage.dataset.index
  if (index === imagesRef.length - 1) {
    setNewSrc(0, 0)
    return
  }
  console.log(index)
    setNewSrc(1,index);
}