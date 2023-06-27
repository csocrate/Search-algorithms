/**
 * ------------------------------------------------------------
 * Les Petits Plats pages/RecipesPage.js
 * ------------------------------------------------------------
 */

 class RecipesPage {
  constructor() {
    this.$recipeCards = document.querySelector('.recipe-cards');
    this.$activeTags = document.querySelector('#active_tags');
  }

  /**
   * Displays item for dropdown
   * With data
   * @param {string} data 
   * @param {HTMLElement} list 
   */
  async displayItemForDropdown(data, list) {
    const itemDropdown = new ItemDropdown();
    itemDropdown.createItemForDropdown(data, list);
  }
  
  /**
   * Displays active tag
   * @param {HTMLElement} item 
   */
  async displayActiveTag(item) {
    this.$activeTags.appendChild(item);
  }

  /**
   * Displays recipe card
   * With data
   * @param {HTMLElement} data
   */
  async displayRecipeCard(data) {
    this.$recipeCards.appendChild(data);
  }
 }