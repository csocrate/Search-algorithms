/**
 * ------------------------------------------------------------
 * Les Petits Plats utils/MainSearchBar.js
 * ------------------------------------------------------------
 */

class MainSearchBar {
  constructor() {
  this.$form = document.querySelector('#main_search');
  this.$input = document.querySelector('#recipes_search');
  this.$closeBtn = document.querySelector('#main_search .btn-close');
  this.dataRecipe =  new RegExp("^[a-zA-Z]([a-zA-Z\-\s]){2,30}$", "g");

  this.init();
  }

  init() {
    this.$input.addEventListener('focus', (e) => {
      this.isInputFocus(e);
    }, false);

    this.$input.addEventListener('blur', (e) => {
      this.isInputBlur(e);
    }, false);

    this.$form.addEventListener("submit", (e) => {
      this.validate(e);
    }, false);

    document.querySelector('#main_search').addEventListener("click", () => {
      this.closeBtn();
    }, false);

    document.addEventListener('keyup', e => {
      this.onKeyUpAction(e)
    });
  }

  isInputFocus(e) {
    e.target.removeAttribute('placeholder');
  }

  isInputBlur(e) {
    e.target.setAttribute('placeholder', 'Rechercher une recette, un ingrédient...');
  }

  /**
  * Implement rules - About data main search bar
  * @param {string} name - Value name of input element
  * @param {object} regExpName - Expected data rules
  * @param {string} errorText - Message
  * @returns {boolean} - If user data is set to true or false that means required field is correct or not
  * @see inputValidation
  */
  isValueMatch({name}, regExpName, errorText) {
    const inputByname = document.querySelector("input[name=" + name + "]");
    const errorMessage = document.querySelector(".error-message");

    if (inputByname.value.match(regExpName)) {
      errorMessage.textContent= "";
      errorMessage.dataset.errorVisible = "false";
      return true;
    } else {
      errorMessage.textContent = errorText;
      errorMessage.dataset.errorVisible = "true";
      return false;
    }
  }

  /**
   * Returns error message with data recipe
   * @param {string} data - data recipes
   * @returns errorMessage
   * @see inputValidation
   */
  errorMessage() {
    const errorMessage = `Merci de saisir au moins trois caractères.`;
    return errorMessage;
  }
  
  
  /**
   * Rejects any input that doesn't follow rules
   * @see {@link errorMessage}
   * @see {@link isValueMatch}
   */
  inputValidation() {
    let result = true;
  
    if (!this.isValueMatch(recipes_search, this.dataRecipe, this.errorMessage())) {
      result = false;
    }

    if (result === true ) {
      console.log('success')
      this.$closeBtn.classList.replace('d-none', 'd-inline-block');
    }
  }
  
  /**
   * Close form button
   */
  closeBtn() {
    this.removeInputValue();
    this.$closeBtn.classList.replace('d-inline-block', 'd-none');
  }

  removeInputValue() {
    this.$input.value = '';
  }

  /**
   * Closes modal with keyboard event
   * @see closeModal()
   * @param {KeyboardEvent} e 
   */
  onKeyUpAction(e) {
    if (this.$input === document.activeElement) {
      if (e.key === 'Escape') {
        this.closeBtn();
        document.querySelector('header .navbar-brand').focus();
      }
    }
  }
  
  /**
   * Handle implementation form input and user response
   * when submit event is fires
   */
  validate(e) {
    e.preventDefault(); // Prevent the form being submitted
    this.inputValidation();
  }
}