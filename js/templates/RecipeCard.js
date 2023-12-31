/**
 * ------------------------------------------------------------
 * Les Petits Plats templates/RecipeCard.js
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
      <div class="card rounded-bottom-4 border-0">
      <div class="h-300px position-relative">
        <img 
          src="./assets/images/cards/${this._recipes.image}" 
          class="card-img-top object-fit-cover h-100" 
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
          ${this.createIngredientsDom()}
        </div>
      </div>
    </div>`;

    article.innerHTML = recipeCard;

    return article;
  }

  /**
   * Returns ingredients template
   * @returns {HTMLElement} - ingredientsDom
   */
  createIngredientsDom() {

    const ingredientsDom = this._recipes.ingredients
      .map(el => {
        const ingredient = el.ingredient;
        const quantity = el.quantity;
        const unit = el.unit;

        const all = `
        <div class="w-50">
          <p class="mb-0_1">
          ${ingredient}
          </p>
          <p class="text-body-tertiary fw-medium">
          ${quantity}${unit}
          </p>
        </div>`;

        const ingredientAndQuantity = `
        <div class="w-50">
          <p class="mb-0_1">
          ${ingredient}
          </p>
          <p class="text-body-tertiary fw-medium">
          ${quantity}
          </p>
        </div>`;

        const ingredientOnly = `
        <div class="w-50">
          <p class="mb-0_1">
          ${ingredient}
          </p>
        </div>`;

        if (ingredient && quantity) {
          if (unit) {
            return all;
          } else {
            return ingredientAndQuantity;
          }
        } else {
          return ingredientOnly;
        }
      }).join(' ');

    return ingredientsDom;
  }
}