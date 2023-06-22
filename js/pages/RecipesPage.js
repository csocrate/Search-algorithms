/**
 * ------------------------------------------------------------
 * Les Petits Plats pages/RecipesPage.js
 * ------------------------------------------------------------
 */

 class RecipesPage {
  constructor() {
    this.$recipeCards = document.querySelector('.recipe-cards');
  }

  /**
   * Displays ingredients dropdown
   * With data
   * @param {HTMLElement} data
   */
  async displayIngredientDropdown(data) {
    const itemsDropdown = new ItemsDropdown(data);
    itemsDropdown.createIngredientDropdown();
  }

  /**
   * Displays appliances dropdown
   * With data
   * @param {HTMLElement} data
   */
  async displayApplianceDropdown(data) {
    const itemsDropdown = new ItemsDropdown(data);
    itemsDropdown.createApplianceDropdown();
  }

  /**
   * Displays ustensils dropdown
   * With data
   * @param {HTMLElement} data
   */
  async displayUstensilDropdown(data) {
    const itemsDropdown = new ItemsDropdown(data);
    itemsDropdown.createUstensilDropdown();
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