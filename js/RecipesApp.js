/**
 * ------------------------------------------------------------
 * Les Petits Plats RecipesApp.js
 * ------------------------------------------------------------
 */

class RecipesApp {
  recipesData = undefined;

  constructor() {
    this.dataApi = new DataApi('/data/recipes.json');
  }

  async init() {
    const recipesData = await this.dataApi.recipesFetch();
    console.log(recipesData)
  }
}
const recipesApp = new RecipesApp();
recipesApp.init();