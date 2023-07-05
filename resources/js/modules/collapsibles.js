(function () {
 
  const init = () => {
    const collapsibles = document.querySelectorAll('details');
    collapsibles.forEach((item) => {
      item.addEventListener('toggle', (event) => {
        if (item.open) {
          collapsibles.forEach((item) => {
            if (item !== event.target) {
              item.open = false;
            }

            else if (item === event.target && item.open) {
              // get slug from event.target via data-slug
              const slug = event.target.dataset.slug;
              // add slug to url
              window.history.pushState({}, '', `#${slug}`);
            }
          });
        }
      });
    });

    // if there is a hash in the url, open the corresponding collapsible
    // scroll to the corresponding collapsible
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const collapsible = document.querySelector(`details[data-slug="${hash}"]`);
      collapsible.open = true;

      // scroll to the corresponding collapsible
      collapsible.scrollIntoView({behavior: 'smooth'});

    }

  };

  init();
  
})();