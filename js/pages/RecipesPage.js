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
   * Allows to display recipe card
   * With data
   * @param {HTMLElement} recipe 
   */
  async displayRecipeCard(data) {
    this.$recipeCards.appendChild(data);
  }
 }