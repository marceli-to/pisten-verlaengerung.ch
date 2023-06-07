import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

(function () {

  const selectors = {
    html: 'html',
    tile: 'data-tile',
    overlay: 'data-overlay-item',
    inline: 'data-inline-item',
  };

  const cssClasses = {
    active: 'is-active',
    overlay: 'has-overlay',
  };

  const init = () => {

    initSwiper();

    // on click 'data-tile-*' show the corresponding 'data-overlay-*'
    // only if its a non-touch device
    if (!('ontouchstart' in window)) {
      document.querySelectorAll(`[${selectors.tile}]`).forEach(function(tile) {
        tile.addEventListener('click', function() {

          hideAllOverlaysItems();
          hideAllInlineItems();

          const overlayItem = document.querySelector(`[${selectors.overlay}="${tile.dataset.tile}"]`);
          showOverlayItem(overlayItem);

          const inlineItem = document.querySelector(`[${selectors.inline}="${tile.dataset.tile}"]`);
          showInlineItem(inlineItem);
          showOverlay();
        });
      });
    }

    // on touchstart 'data-tile-*' show the corresponding 'data-overlay-*'
    if (!('ontouchstart' in window)) {
      document.querySelectorAll(`[${selectors.tile}]`).forEach(function(tile) {
        tile.addEventListener('touchstart', function() {

          hideAllOverlaysItems();
          hideAllInlineItems();

          const overlayItem = document.querySelector(`[${selectors.overlay}="${tile.dataset.tile}"]`);
          showOverlayItem(overlayItem);

          const inlineItem = document.querySelector(`[${selectors.inline}="${tile.dataset.tile}"]`);
          showInlineItem(inlineItem);
          showOverlay();
        });
      });
    }
    
    // if the html has the class 'has-overlay' and the scrolls and the data-overlay-item is out of view, hide it
    // use isInViewport function from: https://vanillajstoolkit.com/helpers/isinviewport/
    // add a debounce function to prevent the scroll event from firing too often
    let debounceTimer;
    document.addEventListener('scroll', function() {
      if (hasOverlay()) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function() {
          document.querySelectorAll(`[${selectors.overlay}]`).forEach(function(item) {
            if (!isInViewport(item)) {
              hideOverlayItem(item);
              hideOverlay();
            }
          });
        }, 100);
      }
    });
        
    // on click outside of 'data-tile' hide all 'data-overlay-item'
    document.addEventListener('click', function(event) {
      if (!event.target.closest(`[${selectors.tile}]`)) {
        hideAllOverlaysItems();
        hideAllInlineItems();
      }
    });

    // on esc hide all 'data-overlay-item'
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        hideAllOverlaysItems();
        hideAllInlineItems();
      }
    });
  };

  const hideAllOverlaysItems = () => {
    document.querySelector(selectors.html).classList.remove(cssClasses.overlay);
    document.querySelectorAll(`[${selectors.overlay}]`).forEach(function(item) {
      item.classList.remove(cssClasses.active);
    });
  };

  const showOverlayItem = (item) => {
    item.classList.add(cssClasses.active);
  };
  
  const hideOverlayItem = (item) => {
    item.classList.remove(cssClasses.active);
  };

  const showInlineItem = (item) => {
    item.classList.add(cssClasses.active);
  };

  const hideInlineItem = (item) => {
    item.classList.remove(cssClasses.active);
  };
  
  const hideAllInlineItems = () => {
    document.querySelectorAll(`[${selectors.inline}]`).forEach(function(item) {
      item.classList.remove(cssClasses.active);

    });
  };

  const showOverlay = () => {
    document.querySelector(selectors.html).classList.add(cssClasses.overlay);
  };

  const hideOverlay = () => {
    document.querySelector(selectors.html).classList.remove(cssClasses.overlay);
  };

  const hasOverlay = () => {
    return document.querySelector(selectors.html).classList.contains(cssClasses.overlay);
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

  const isInViewport = (elem) => {
    var distance = elem.getBoundingClientRect();
    return (
      distance.top >= 0 &&
      distance.left >= 0 &&
      distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      distance.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  init();
  
})();