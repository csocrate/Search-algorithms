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
    this.cards = document.querySelectorAll('.recipe-cards article');
    this.$userInput = document.querySelector('#recipes_search');
    this.$form = document.querySelector('#main_search');
    this.errorMessage = this.$form.nextElementSibling;
  }

  get recipes() {
    return this._recipes;
  }

  addNumberOfRecipes() {

    let count = `${this._recipes.length}`;

    this.recipesCounter.textContent = `${count} recettes`;

    return this.recipesCounter.textContent;

  }

  addNumberOfMatchingRecipes() {

    this.recipesCounter.textContent = '';

    let count = 0;

    for (let i = 0; i < this.cards.length; i++) {
      const matches = this.cards[i].dataset.matches > parseInt(0);
      if (matches) {
        count++;
      }
    }

    if (count == 0) {
      this.errorMessage.textContent = `
      Aucune recette ne contient "${this.$userInput.value}", 
      vous pouvez chercher "tarte aux pommes", "poisson", etc.`;

      this.errorMessage.classList.replace('bg-transparent', 'bg-secondary');

      this.recipesCounter.textContent = `${count} recette`;
      
    } else {
      this.errorMessage.textContent = '';

      this.errorMessage.classList.replace('bg-secondary', 'bg-transparent');
    
      if (count < 10) {
  
        if (count == 1) {

          this.recipesCounter.textContent = `0${count} recette`;
        } else {
          this.recipesCounter.textContent = `0${count} recettes`;
        }
  
      } else if (count >= 10) {
  
        this.recipesCounter.textContent = `${count} recettes`;  
      }
    }
  }

  addNumberOfMatchingRecipesByFilter(matchingData) {

    this.recipesCounter.textContent = '';

    let count = matchingData;

    if (count == 0) {
      this.recipesCounter.textContent = `${count} recette`;

    } else {
    
      if (count < 10) {
  
        if (count == 1) {

          this.recipesCounter.textContent = `0${count} recette`;
        } else {
          this.recipesCounter.textContent = `0${count} recettes`;
        }
  
      } else if (count >= 10) {
  
        this.recipesCounter.textContent = `${count} recettes`;  
      }
    }

  }
}