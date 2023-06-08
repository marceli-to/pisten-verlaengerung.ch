(function () {

  const init = () => {
    validateFormFields();
  };

  const validateFormFields = () => {
    const form = document.querySelector('.newsletter-form');
    const inputFields = form.querySelectorAll('input');

    inputFields.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.type == 'text') {
          validateText(input);
        }
        else if (input.type == 'email') {
          validateEmail(input);
        }
      });

      input.addEventListener('focus', () => {
        hideIcon(input);
      });
    });

    form.addEventListener('submit', event => {
      const isValid = validateAllFields(inputFields);
      if (!isValid) {
        event.preventDefault();
        return false;
      }
    });
  };

  const showInvalidIcon = (input) => {
    const invalidIcon = input.parentNode.querySelector('.icon-invalid');
    if (invalidIcon.classList.contains('icon-invalid')) {
      invalidIcon.classList.remove('hidden');
      invalidIcon.classList.add('block');
    }
  };

  const showValidIcon = (input) => {
    const validIcon = input.parentNode.querySelector('.icon-valid');
    if (validIcon.classList.contains('icon-valid')) {
      validIcon.classList.remove('hidden')
      validIcon.classList.add('block');
    }
  };

  const hideIcon = (input) => {
    const icons = input.parentNode.querySelectorAll('.icon-valid, .icon-invalid');
    icons.forEach(icon => {
      icon.classList.remove('block');
      icon.classList.add('hidden');
    });
  };

  const validateAllFields = (inputFields) => {
    let isValid = true;
    inputFields.forEach(input => {
      const inputValue = input.value.trim();
      if (inputValue === '') {
        isValid = false;
        showInvalidIcon(input);
      }
    });

    return isValid;
  };

  const validateEmail = (input) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(input.value)) {
      showInvalidIcon(input);
    } 
    else {
      showValidIcon(input);
    }
  };

  const validateText = (input) => {
    const inputValue = input.value.trim();
    if (inputValue === '') {
      showInvalidIcon(input);
    } 
    else {
      showValidIcon(input);
    }
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.newsletter-form')) {
      init();
    }
  });
  
})();