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
    this.dropdownHeaders = this.$advancedFilters.querySelectorAll('button[aria-haspopup=listbox]');

    // Regular expression
    this.inputRules = new RegExp(/^[\D+|\s]{3,30}$/, 'gmi');

    this.init();
  }

  init() {
    this.handleCloseBtn();
    this.HandleToggledArrowIcon();

    document.addEventListener('keyup', e => {
      this.onKeyUpAction(e);
    });
  }

  handleCloseBtn() {

    this.$closeBtn.forEach(btn => {
      btn.addEventListener('click', (e) => {

        this.closeBtn(btn);
        this.removeUserInputValue(e.target);
        btn.dataset.clicked = 'true';

      }, false);
    });
  }

  /**
   * Toggles arrow icon on dropdown header
   * @see toggleArrow
   * @see downArrowIcon
   */
  HandleToggledArrowIcon() {

    this.dropdownHeaders
      .forEach(dropdownHeader => {

        dropdownHeader.addEventListener('click', () =>
          this.toggleArrowIcon(dropdownHeader), false);

        dropdownHeader.addEventListener('blur', () =>
          this.downArrowIcon(dropdownHeader), false);
      });
  }

  /**
   * Toggles up icon with down icon
   * @param {HTMLElement} element 
   */
  toggleArrowIcon(element) {

    const icon = element.querySelector('span.fa-solid');

    if (element.getAttribute('aria-expanded') === 'true') {

      icon.classList.replace('fa-chevron-down', 'fa-chevron-up');

    } else {
      icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    }
  }

  /**
   * Replaces up icon by down icon
   * @param {HTMLElement} element 
   */
  downArrowIcon(element) {
    const icon = element.querySelector('span.fa-solid');

    if (icon.classList.contains('fa-chevron-up')) {

      icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    }
  }

  /**
   * Replaces up icon by down icon
   * for each dropdown header
   * @see downArrowIcon
   */
  forceArrowIconDown() {

    this.dropdownHeaders
      .forEach(dropdownHeader => {

        this.downArrowIcon(dropdownHeader);
      });
  }

  /**
   * Downs icon on key event
   * @param {KeyboardEvent} e
   * @see downArrowIcon
   */
  onKeyUpAction(e) {

    this.dropdownHeaders
      .forEach(dropdownHeader => {

        if (dropdownHeader === document.activeElement) {
          if (e.key === 'Escape') {
            this.downArrowIcon(dropdownHeader);
          }
        }
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

    if (inputValue && !isValid) {

      currentInput.dataset.validInput = 'false';

      if (btn.classList.contains('d-inline-block')) {
        this.closeBtn(btn);
      }

      return false;
    }

    if (inputValue) {
      this.launchBtn(btn);
    }

    btn.dataset.clicked = 'false';
    currentInput.dataset.validInput = 'true';

    return true;
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

  cleanEachSelectBoxes() {

    const selectBoxes = this.$advancedFilters.querySelectorAll('select');
    const customSelectBoxes = this.$advancedFilters.querySelectorAll('ul');

    selectBoxes
      .forEach(select => {
        if (select.innerHTML != '') {
          select.innerHTML = '';
        }
      });

    customSelectBoxes
      .forEach(customSelect => {
        if (customSelect.innerHTML != '') {
          this.cleanCustomSelect(customSelect);
        }
      });
  }

  /**
   * Cleans select boxes and keeps search input on custom select
   * @see cleanCustomSelect
   */
  cleanSelectBoxes(customSelect, select) {
    this.cleanCustomSelect(customSelect);
    select.innerHTML = '';
  }

  /**
   * 
   * @param {HTMLElement} customSelect 
   */
  cleanCustomSelect(customSelect) {
    const items = Array.from(customSelect.children).slice(1);

    items
      .forEach(item => customSelect.removeChild(item));
  }
}