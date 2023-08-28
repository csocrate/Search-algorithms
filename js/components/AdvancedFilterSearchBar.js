/**
 * ------------------------------------------------------------
 * Les Petits Plats components/AdvancedFilterSearchBar.js
 * ------------------------------------------------------------
 */

class AdvancedFilterSearchBar {
  constructor() {
    // DOM
    this.$advancedFilters = document.querySelector('.advanced-filters');
    this.$closeBtn = document.querySelectorAll('.advanced-filters li .btn-close');

    // Regular expression
    this.inputRules = new RegExp(/^[\w+|\s]{3,30}$/, 'gmi');

    this.init();
  }

  init() {
    this.handleCloseBtn();
    this.isAdvancedFilterExpanded();
  }

  handleCloseBtn() {

    this.$closeBtn.forEach(btn => {
      btn.addEventListener('click', (e) => {

        this.closeBtn(btn);
        this.removeUserInputValue(e.target);

      }, false);
    });
  }

  /**
   * Toggles arrow icon on dropdown header
   */
  isAdvancedFilterExpanded() {
    const dropdownHeaders = this.$advancedFilters.querySelectorAll('button[aria-haspopup=listbox]');

    dropdownHeaders
      .forEach(dropdownHeader => {

        dropdownHeader.addEventListener('click', (e) => {

          const icon = dropdownHeader.querySelector('span.fa-solid');

          if (dropdownHeader.getAttribute('aria-expanded') === 'true') {

            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');

          } else {
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
          }

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

      if (inputValue) {
        this.launchBtn(btn);
      }

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
   * Removes user input value
   * @param {Event & {eventTarget: HTMLInputElement}} eventTarget
   */
  removeUserInputValue(eventTarget) {
    const dropdownMenu = eventTarget.closest('.dropdown-menu');

    dropdownMenu.querySelector('input').value = '';
  }
}