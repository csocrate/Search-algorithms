/**
 * ------------------------------------------------------------
 * Les Petits Plats components/FilterTags.js
 * ------------------------------------------------------------
 */

class FilterTags {
  constructor() {
    this.recipesPage = new RecipesPage();

    // DOM
    this.$customSelectBoxes = document.querySelectorAll('.search-filters ul');
    this.$tagsContainer = document.querySelector('#filter_tags');
  }

  /**
   * @see handleDisplayingTag
   * @see cleanUserInputValue
   */
  displayFilterTagsByDropdownList() {
    
    this.$customSelectBoxes
      .forEach(customSelect => {

        const customOptions = customSelect.querySelectorAll('a[role=option]');

        let optionTags = [];

          Array.from(customOptions)
            .forEach(customOption => { 

              customOption.addEventListener('click', () => {

                optionTags.push(customOption.textContent.trim());
                
                this.handleDisplayingTag(optionTags);

                this.cleanUserInputValue(customOption);
              });
            });
      });
  }

  /**
   * Cleans user input value
   * With click on dropdown close button
   * @param {HTMLElement} activeItem 
   */
  cleanUserInputValue(activeItem) {

    const closeBtn = activeItem.closest('.dropdown-menu').querySelector('.btn-close');

    if (closeBtn.classList.contains('d-inline-block')) {
      closeBtn.click();
    }
  }

  /**
   * Launches and closes tag
   * @param {Object} items 
   * @see launchTag
   * @see closeTag
   */
  handleDisplayingTag(items) {

    this.launchTag(items);

    this.closeTag();    
  }


  /**
   * Launches tag
   * @type {(string|Array)}
   * @param {Object} items
   * @see ActiveTag | createActivetag
   * @see RecipesPage | displayActiveTag
   */
   launchTag(items) {    

    items
      .forEach(item => {

        const activeTag = new ActiveTag();
        const tag = activeTag.createActivetag(item);
        this.recipesPage.displayActiveTag(tag);
      });
  }

  /**
   * Closes tag
   * @see handleSelectedItemInDropdown
   */
  closeTag() {
    const closeBtn = this.$tagsContainer.querySelectorAll('.btn-close');

    closeBtn
      .forEach(btn => {
        btn.addEventListener('click', () => {

          const tag = btn.parentElement;

          tag.remove();
        })
      });
  }

  /**
   * Cleans user input value
   * With click on dropdown close button
   * @param {HTMLElement} activeItem 
   */
  cleanUserInputValue(activeItem) {

    const closeBtn = activeItem.closest('.dropdown-menu').querySelector('.btn-close');

    if (closeBtn.classList.contains('d-inline-block')) {
      closeBtn.click();
    }
  }
}