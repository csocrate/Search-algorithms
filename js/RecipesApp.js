/**
 * ------------------------------------------------------------
 * Les Petits Plats RecipesApp.js
 * ------------------------------------------------------------
 */

class RecipesApp {
  recipesData = undefined;

  constructor() {
    this.dataApi = new DataApi('/data/recipes.json');
    this.recipesPage = new RecipesPage();
  }

  async init() {
    const recipesData = await this.dataApi.recipesFetch();

    recipesData
      .forEach(recipe => {
        const recipeCard = new RecipeCard(recipe);

        // Display card
        const card = recipeCard.createRecipeCard();
        this.recipesPage.displayRecipeCard(card);
        
        // Display Ingredients
        recipeCard.displayIngredients();
      });
  }
}
const recipesApp = new RecipesApp();
recipesApp.init();