/**
 * ------------------------------------------------------------
 * Les Petits Plats models/Recipes.js
 * ------------------------------------------------------------
 */

class Recipes {
  /**
   * To create getters of recipes properties
   * @param {Object} data - list of objects from .json file
   */
  constructor(data) {
    this._id = data.id;
    this._image = data.image;
    this._name = data.name;
    this._servings = data.servings;
    this._ingredients = data.ingredients;
    this._time = data.time;
    this._description = data.description;
    this._appliance = data.appliance;
    this._ustensils = data.ustensils;
  }

  get id() {
    return this._id;
  }

  get image() {
    return this._image;
  }

  get name() {
    return this._name;
  }

  get servings() {
    return this._servings;
  }

  get ingredients() {
    return this._ingredients;
  }

  // get ingredientsDom() {

  //   this._ingredients
  //     .map(ingredient => {

  //       let content = ingredient.ingredient;
  //       let quantity = ingredient.quantity;
  //       let unit = ingredient.unit;
        
  //       const all = `
  //       <div class="w-50">
  //         <p class="mb-0_1">
  //         ${content}
  //         </p>
  //         <p class="text-body-tertiary fw-medium">
  //         ${quantity}${unit}
  //         </p>
  //       </div>`;
    
  //       const ingredientAndQuantity = `
  //       <div class="w-50">
  //         <p class="mb-0_1">
  //         ${content}
  //         </p>
  //         <p class="text-body-tertiary fw-medium">
  //         ${quantity}
  //         </p>
  //       </div>`;
    
  //       const ingredientOnly = `
  //       <div class="w-50">
  //         <p class="mb-0_1">
  //         ${content}
  //         </p>
  //       </div>`;

  //       if (content && quantity) {
  //         if (unit) {
  //           return ingredients.innerHTML = all;
  //         } else {
  //           return ingredients.innerHTML = ingredientAndQuantity;
  //         }
  //       } else {
  //         return ingredients.innerHTML = ingredientOnly;
  //       }
  //     });
  // }

  get time() {
    return this._time
  }

  get description() {
    return this._description
  }

  get appliance() {
    return this._appliance
  }

  get ustensils() {
    return this._ustensils
  }
}