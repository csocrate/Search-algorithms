/**
 * ------------------------------------------------------------
 * Les Petits Plats components/MainSearchBar.js
 * ------------------------------------------------------------
 */

class MainSearchBar {
  constructor() {
    this.$form = document.querySelector('#main_search');
    this.$input = document.querySelector('#recipes_search');
    this.$closeBtn = document.querySelector('#main_search .btn-close');
    this.inputRules = new RegExp(/^[\w+|\s]{2,30}$/, 'gmi');

    this.init();
  }

  init() {
    this.$input.addEventListener('focus', (e) => {
      this.isInputFocus(e);
    }, false);

    this.$input.addEventListener('blur', (e) => {
      this.isInputBlur(e);
    }, false);

    this.$form.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent the form being submitted
    });

    this.$form.querySelector('label').addEventListener('click', (e) => {
      this.isCharacterErrorMessage();
    });

    this.$form.querySelector('button').addEventListener("click", () => {
      this.closeBtn();
      this.removeInputValue();
    }, false);

    document.addEventListener('keyup', e => {
      this.onKeyUpAction(e);
    });
  }

  /**
   * 
   * @param {FocusEvent} e 
   */
  isInputFocus(e) {
    e.target.removeAttribute('placeholder');
  }

  /**
   * 
   * @param {BlurEvent} e 
   */
  isInputBlur(e) {
    e.target.setAttribute('placeholder', 'Rechercher une recette, un ingrédient...');
  }

  /**
  * Implement rules - About data main search bar
  * @param {string} inputValue - Input value
  * @param {object} regExpName - Expected data rules
  * @returns {boolean} - If user data is set to true or false that means required field is correct or not
  */
  isValueMatch(inputValue, regExpName) {
    const errorMessage = document.querySelector(".error-message");

    if (inputValue.match(regExpName)) {
      errorMessage.dataset.errorVisible = "false";
      return true;
    } else {
      errorMessage.dataset.errorVisible = "true";
      return false;
    }
  }

  /**
   * Returns error message
   * @param {string} text
   * @returns errorMessage
   */
  errorMessage(text) {
    const errorMessage = document.querySelector(".error-message");
    errorMessage.textContent = text;
    return errorMessage;
  }

  /**
   * Error message when user input value
   * Not matches with input validation rules
   */
  isCharacterErrorMessage() {
    const message = `Merci de saisir au moins trois caractères.`;

    const userInputValue = this.$input.value;

    if (!userInputValue.match(this.inputRules)) {
      this.errorMessage(message);
    }
  }

  /**
   * Rejects input that doesn't follow rules
   * @see {@link isValueMatch}
   */
  inputValidation(inputValue) {
    let result = true;

    if (!this.isValueMatch(inputValue, this.inputRules)) {

      this.$input.dataset.validInput = 'false';

      this.$form.querySelector('label').classList.replace('btn-primary', 'btn-secondary');
      this.$form.querySelector('label svg').style.fill = '#EDEDED';

      if (this.$closeBtn.classList.contains('d-inline-block')) {
        this.closeBtn();
      }
      
      this.errorMessage('');

      result = false;
    }

    if (result === true) {

      this.$input.dataset.validInput = 'true';

      this.$form.querySelector('label').classList.replace('btn-secondary', 'btn-primary');
      this.$form.querySelector('label svg').style.fill = '#000';
      this.$closeBtn.classList.replace('d-none', 'd-inline-block');

      const errorMessage = this.$form.nextElementSibling;
      errorMessage.innerHTML = '';
    }

    return result;
  }

  /**
   * Close form button
   */
  closeBtn() {
    this.$closeBtn.classList.replace('d-inline-block', 'd-none');
  }

  removeInputValue() {
    this.$input.value = '';
  }

  /**
   * 
   * @see closeBtn()
   * @param {KeyboardEvent} e 
   */
  onKeyUpAction(e) {
    if (this.$input === document.activeElement) {

      if (e.key === 'Escape') {
        this.closeBtn();
        document.querySelector('header .navbar-brand').focus();

      } else if (e.key === 'Enter') {
        e.preventDefault(); // Prevent the form being submitted

        this.$form.querySelector('label').click();
      }
    }
  }
}