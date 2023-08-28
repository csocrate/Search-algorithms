/**
 * ------------------------------------------------------------
 * Les Petits Plats factories/RecipeFactories.js
 * ------------------------------------------------------------
 */

class RecipeFactories {
  /**
   * Returns a new Recipe with recipe properties
   * @param {Object} data 
   * @param {string} type
   * @returns {Object | Object} Recipe
   */
  constructor(data, type) {
    if (type === 'recipe') {

      return new Recipe(data);

    } else {
      throw 'Unknown type format';
    }
  }
}