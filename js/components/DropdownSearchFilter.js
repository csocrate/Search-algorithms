/**
 * ------------------------------------------------------------
 * Les Petits Plats components/DropdownSearchFilter.js
 * ------------------------------------------------------------
 */

class DropdownSearchFilter {
  constructor() {
    this.inputRules = new RegExp('^[a-zA-Z]([a-zA-Z\-\s]){2,30}$', 'g');
    this.$searchFilters = document.querySelectorAll('.search-filters ul');
    this.$closeBtn = document.querySelectorAll('.search-filters li .btn-close');

    this.init();
  }

  init() {
    this.handleCloseBtn();
  }

  handleCloseBtn() {

    this.$closeBtn.forEach(btn => {
      btn.addEventListener('click', (e) => {
        
        this.closeBtn(btn);
        this.removeUserInputValue(e.target);

        const dataDropdownList = new DataDropdownList();
        dataDropdownList.displayDataOnDropdownLists(this.recipesData);
      }, false);
    });
  }

  /**
  * Returns result from rules implementation - About data input filter
  * @param {string} inputValue - Input value
   * @param {HTMLElement} currentInput
  * @returns {boolean} - If user data is set to true or false that means required field is correct or not
   */
  IsUserInputValid(inputValue, currentInput) {

    const btn = currentInput.nextElementSibling;

    const isValid = inputValue.match(this.inputRules);

    let result = true;

    if (!isValid) {
      result = false;

      currentInput.dataset.validInput = 'false';

      if (btn.classList.contains('d-inline-block')) {
        this.closeBtn(btn);
      }
    }

    if (result === true) {
      this.launchBtn(btn);
      currentInput.dataset.validInput = 'true';
    }

    return result;
  }

  /**
   * Launches search input button
   * @param {HTMLElement} btn 
   */
  launchBtn(btn) {
    btn.classList.replace('d-none', 'd-inline-block');
  }

  /**
   * Closes search input button
   * @param {HTMLElement} btn 
   */
  closeBtn(btn) {
    btn.classList.replace('d-inline-block', 'd-none');
  }

  /**
   * Removes search input value of user
   * @param {HTMLElement} btn 
   */
  removeUserInputValue(btn) {
    btn.previousElementSibling.value = '';
  }
}