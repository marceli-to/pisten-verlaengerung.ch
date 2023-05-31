import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

(function () {

  const selectors = {
    tile: 'data-tile',
    overlay: 'data-overlay-item',
    inline: 'data-inline-item',
  };

  const cssClasses = {
    active: 'is-active',
  };

  const init = () => {

    initSwiper();

    // on click 'data-tile-*' show the corresponding 'data-overlay-*'
    document.querySelectorAll(`[${selectors.tile}]`).forEach(function(tile) {
      tile.addEventListener('click', function() {

        // hide all overlays
        hideAllOverlays();
        hideAllInlines();

        const overlayItem = document.querySelector(`[${selectors.overlay}="${tile.dataset.tile}"]`);
        overlayItem.classList.add(cssClasses.active);

        const inlineItem = document.querySelector(`[${selectors.inline}="${tile.dataset.tile}"]`);
        inlineItem.classList.add(cssClasses.active);
      });
    });

    // on click outside of 'data-tile' hide all 'data-overlay-item'
    document.addEventListener('click', function(event) {
      if (!event.target.closest(`[${selectors.tile}]`)) {
        hideAllOverlays();
        hideAllInlines();
      }
    });

    // on esc hide all 'data-overlay-item'
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        hideAllOverlays();
        hideAllInlines();
      }
    });
  };

  const hideAllOverlays = () => {
    document.querySelectorAll(`[${selectors.overlay}]`).forEach(function(item) {
      item.classList.remove(cssClasses.active);
    });
  };

  const hideAllInlines = () => {
    document.querySelectorAll(`[${selectors.inline}]`).forEach(function(item) {
      item.classList.remove(cssClasses.active);
    });
  };

  const initSwiper = () => {
    const swiper = new Swiper(".js-swiper", {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: {
        nextEl: '.js-swiper-btn-next',
        prevEl: '.js-swiper-btn-prev',
      },
      breakpoints: {
        600: {
          slidesPerView: 3,
        },
        860: {
          slidesPerView: 4,
        },
        1100: {
          slidesPerView: 5,
        },
        1400: {
          slidesPerView: 6,
        },
      },
    });
  };

  init();
  
})();