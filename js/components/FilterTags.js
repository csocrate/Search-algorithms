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
   * @see avoidDuplicatedTags
   * @see handleDisplayingTag
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

                // To keep only in the rest of custom options
                customOption.parentNode.classList.add('d-none');
                
                this.handleDisplayingTag(optionTags);
              });
            });
      });
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
   * @see updateDropdownList
   */
  closeTag() {
    const closeBtn = this.$tagsContainer.querySelectorAll('.btn-close');

    closeBtn
      .forEach(btn => {
        btn.addEventListener('click', () => {

          const tag = btn.parentElement;
          
          this.updateDropdownList(tag);

          tag.remove();
        })
      });
  }

  /**
   * Displays tag content text on dropdown list before to remove it 
   * @param {HTMLElement} tag 
   */
  updateDropdownList(tag) {

    this.$customSelectBoxes
      .forEach(customSelect => {

        const customOptions = customSelect.querySelectorAll('a[role=option]');

          Array.from(customOptions)
            .forEach(customOption => {

              if (customOption.parentElement.className === 'd-none') {

                if (customOption.textContent.trim() === tag.textContent.trim()) {
                  customOption.parentNode.classList.replace('d-none', 'd-block')
                }
              }
            });
      });
  }
}