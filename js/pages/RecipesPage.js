/**
 * ------------------------------------------------------------
 * Les Petits Plats pages/RecipesPage.js
 * ------------------------------------------------------------
 */

class RecipesPage {
  constructor() {
    this.$recipeCards = document.querySelector('.recipe-cards');
    this.$activeTags = document.querySelector('#filter_tags');
  }

  /**
   * Displays item for dropdown custom select
   * With data
   * @param {string} data 
   * @param {HTMLElement} list 
   */
  async displayItemInDropdown(data, list) {
    const itemDropdown = new ItemDropdown();
    itemDropdown.createItemForDropdown(data, list);
  }

  /**
   * Displays option for dropdown select
   * With data
   * @param {string} data 
   * @param {HTMLElement} select 
   */
  async displayOptionInDropdown(data, select) {
    const itemDropdown = new ItemDropdown();
    itemDropdown.createOptionForDropdown(data, select);
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

  /**
   * Displays recipes counter
   * by data
   * @param {string} cards
   */
  async displayRecipesCounter(cards) {
    const recipesCounter = new RecipesCounter(cards);
    recipesCounter.addNumberOfRecipes();
  }

  /**
   * Displays matching recipes counter
   * by data
   * @param {string} cards
   */
  async displayMatchingRecipesCounter(cards) {
    const recipesCounter = new RecipesCounter(cards);
    recipesCounter.addNumberOfMatchingRecipes();
  }

  /**
   * Displays matching recipes counter
   * by data filter
   * @param {string} cards
   */
  async displayMatchingRecipesCounterByFilter(cards, matchingData) {
    const recipesCounter = new RecipesCounter(cards);
    recipesCounter.addNumberOfMatchingRecipesByFilter(matchingData);
  }
}