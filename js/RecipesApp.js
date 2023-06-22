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

        // Display ingredients dropdown
        this.recipesPage.displayIngredientDropdown(recipe);

        // Display appliances dropdown
        this.recipesPage.displayApplianceDropdown(recipe);

        // Display ustensils dropdown
        this.recipesPage.displayUstensilDropdown(recipe);

        // Display recipes card
        const recipeCard = new RecipeCard(recipe);
        const card = recipeCard.createRecipeCard();
        this.recipesPage.displayRecipeCard(card);
      });
  }
}
const recipesApp = new RecipesApp();
recipesApp.init();