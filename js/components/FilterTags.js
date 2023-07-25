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

                // To keep only the rest of custom options
                customOption.parentNode.classList.add('d-none');

                this.avoidDuplicateItems(optionTags)

                const tagBtn = this.avoidDuplicateItems(optionTags);

                this.displayFiltertags(tagBtn);
              });
            });
      });
  }

  /**
   * 
   * @param {Array} array 
   * @returns {Array} acc
   */
  avoidDuplicateItems(array) {
          
    return array
      .reduce((acc, el) => {

        if (acc.indexOf(el) < 0) {
          acc.push(el);
        }
        console.log(acc)
        return acc;

      }, []);
  }

  /**
   * @type {(string|Array)}
   * @param {Object} items 
   */
  displayFiltertags(items) {

    items
      .forEach(item => {
        console.log(item)

        const activeTag = new ActiveTag();
        const tag = activeTag.createActivetag(item);
        this.recipesPage.displayActiveTag(tag);
      });

    this.closeTag();
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
      })
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