(function () {

  const selectors = {
    tile: 'data-tile',
    overlay: 'data-overlay-item',
  };

  const cssClasses = {
    active: 'is-active',
  };

  const init = () => {

    // on click 'data-tile-*' show the corresponding 'data-overlay-*'
    document.querySelectorAll(`[${selectors.tile}]`).forEach(function(tile) {
      tile.addEventListener('click', function() {

        // hide all overlays
        hideAllOverlays();

        const overlayItem = document.querySelector(`[${selectors.overlay}="${tile.dataset.tile}"]`);
        overlayItem.classList.add(cssClasses.active);
      });
    });

    // on click outside of 'data-tile' hide all 'data-overlay-item'
    document.addEventListener('click', function(event) {
      if (!event.target.closest(`[${selectors.tile}]`)) {
        hideAllOverlays();
      }
    });

    // on esc hide all 'data-overlay-item'
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        hideAllOverlays();
      }
    });
  };

  const hideAllOverlays = () => {
    document.querySelectorAll(`[${selectors.overlay}]`).forEach(function(item) {
      item.classList.remove(cssClasses.active);
    });
  };

  init();
  
})();