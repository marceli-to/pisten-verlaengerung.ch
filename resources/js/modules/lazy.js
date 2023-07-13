import LazyLoad from "vanilla-lazyload";
let lazyLoadInstance = new LazyLoad();
// dom content loaded
document.addEventListener("DOMContentLoaded", function() {
  // lazy load images
  lazyLoadInstance.update();
});

