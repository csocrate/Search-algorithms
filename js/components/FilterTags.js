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

  displayFiltertagsByDropdownList() {
    
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

                const tag = this.avoidDuplicatedTags(optionTags);

                this.handleDisplayingTag(tag);
              });
            });
      });
  }

  /**
   * Avoids duplicated tags in tags container
   * @param {Array} array 
   * @returns {Array} lastElement
   */
  avoidDuplicatedTags(array) {
          
    return array
      .reduce((acc, item) => {

        if (acc.indexOf(item) < 0) {
          acc.push(item);
        }

        // To avoid duplicate Dom element
        const lastElement = acc.slice(-1);
        return lastElement;

      }, []);
  }

  /**
   * Launches and closes tag
   * @param {Object} items 
   */
  handleDisplayingTag(items) {

    this.launchTag(items);

    this.closeTag();    
  }


  /**
   * @type {(string|Array)}
   * @param {Object} items 
   */
   launchTag(items) {    

    items
      .forEach(item => {

        const activeTag = new ActiveTag();
        const tag = activeTag.createActivetag(item);
        this.recipesPage.displayActiveTag(tag);
      });
  }

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

    const customOptions = Array.from(document.querySelectorAll('#ingredients_list a[role=option]'));
    
    customOptions
      .forEach(customOption => {

        if (customOption.parentElement.className === 'd-none') {

          if (customOption.textContent.trim() === tag.textContent.trim()) {
            customOption.parentNode.classList.replace('d-none', 'd-block')
          }
        }
      });
  }
}