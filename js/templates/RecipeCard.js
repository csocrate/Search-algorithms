/**
 * ------------------------------------------------------------
 * Les Petits Plats templates/Card.js
 * ------------------------------------------------------------
 */

 class RecipeCard {
  /**
   * @param {Object} recipes - list of objects from .json file
   */
  constructor(recipes) {
    this._recipes = recipes;
  }

  get recipes() {
    return this._recipes;
  }

  /**
   * Returns recipe card template
   * @returns {HTMLElement} - article
   */
  createRecipeCard() {

    const article = document.createElement('article');
    article.classList.add('col');

    const recipeCard = `
      <!-- Cards -->
      <div class="card rounded-bottom-4 border-0">
      <div class="h-300px position-relative">
        <img 
          src="./assets/images/showcase/vedette_768.jpg" 
          class="card-img-top object-fit-cover mh-100" 
          alt="">
        <p class="position-absolute top-5 end-5 rounded-4 px-3 py-1 bg-primary">
          10min
        </p>
      </div>
      <div class="card-body bg-white rounded-bottom-4">
        <h2 class="card-title font-monospace fs-5">
          ${this._recipes.name}
        </h2>
        <h3 class="card-subtitle fs-6 fw-semibold text-uppercase py-3">
          Recette
        </h3>
        <p class="card-text">
          ${this._recipes.description}
        </p>
        <h3 class="card-subtitle fs-6 fw-semibold text-uppercase mt-3 py-3">
          Ingrédients
        </h3>
        <div class="ingredients d-flex flex-wrap justify-content-between">
        <!-- ${this._recipes.ingredientsDom} -->
        </div>
      </div>
    </div>
    <!-- End Cards -->`;

    article.innerHTML = recipeCard;

    return article;
  }

  displayIngredients() {

    const ingredients = document.querySelector('.ingredients');
    console.log(this._recipes.ingredients)

    this._recipes.ingredients
    .map(ingredient => {

      let content = ingredient.ingredient;
      let quantity = ingredient.quantity;
      let unit = ingredient.unit;
      
      const all = `
      <div class="w-50">
        <p class="mb-0_1">
        ${content}
        </p>
        <p class="text-body-tertiary fw-medium">
        ${quantity}${unit}
        </p>
      </div>`;
  
      const ingredientAndQuantity = `
      <div class="w-50">
        <p class="mb-0_1">
        ${content}
        </p>
        <p class="text-body-tertiary fw-medium">
        ${quantity}
        </p>
      </div>`;
  
      const ingredientOnly = `
      <div class="w-50">
        <p class="mb-0_1">
        ${content}
        </p>
      </div>`;

      if (content && quantity) {
        if (unit) {
          return ingredients.innerHTML = all;
  ù
        } else {
          return ingredients.innerHTML = ingredientAndQuantity;
        }
      } else {
        return ingredients.innerHTML = ingredientOnly;
      }      
    });    
 }
}