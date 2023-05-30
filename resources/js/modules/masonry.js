import Masonry from 'masonry-layout';

window.addEventListener('load', function() {
  const elem = document.querySelector('.masonry-grid');

  if (elem) {
    const msnry = new Masonry( elem, {
      itemSelector: '.masonry-grid-item',
      gutter: '.masonry-gutter-sizer',
      columnWidth: '.masonry-grid-sizer',
      percentPosition: true
    });
  }
});