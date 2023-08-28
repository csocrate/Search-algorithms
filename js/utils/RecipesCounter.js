/**
 * ------------------------------------------------------------
 * Les Petits Plats utils/RecipesCounter.js
 * ------------------------------------------------------------
 */

class RecipesCounter {
  /**
   * @param {Object} recipes - list of objects from .json file
   */
  constructor(recipes) {
    this._recipes = recipes;

    this.recipesCounter = document.querySelector('.recipes-counter');

  }

  get recipes() {
    return this._recipes;
  }

  addNumberOfRecipes() {

    let count = `${this._recipes.length} recettes`;

    this.recipesCounter.textContent = `${count} recettes`;

    return this.recipesCounter.textContent;

  }
}