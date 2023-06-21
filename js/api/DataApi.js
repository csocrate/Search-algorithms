/**
 * ------------------------------------------------------------
 * Les Petits Plats api/DataApi.js
 * ------------------------------------------------------------
 */

/**
* @extends Api
*/
class DataApi extends Api {
  /**
   * Gets data recipes from the URL
   * @param {string} url - URL to the path from json file
   */
  constructor(url) {
    super(url)
  }

  /**
   * Returns data recipes from the URL
   * @async
   * @returns {Object} this.data.recipes
   */
  async recipesFetch() {
    if (!this.data) {
      await this.get();
    }
    return this.data.recipes;
  }
}