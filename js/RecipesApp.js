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

    this.$ingredientsList = document.querySelector('#ingredients_list');
    this.$appliancesList = document.querySelector('#appliances_list');
    this.$ustensilsList = document.querySelector('#ustensils_list');
  }

  async init() {
    const recipesData = await this.dataApi.recipesFetch();

    this.recipesData = recipesData;

    // Select boxes
    this.displayIngredientsDropdownWithData();
    this.displayAppliancesDropdownWithData();
    this.displayUstensilsDropdownWithData();

    // Cards
    this.displayRecipeCardsWithData();
  }

  displayRecipeCardsWithData() {
    this.recipesData
      .forEach(recipe => {

        // Displays recipe card
        const recipeCard = new RecipeCard(recipe);
        const card = recipeCard.createRecipeCard();
        this.recipesPage.displayRecipeCard(card);
      });
  }

  displayIngredientsDropdownWithData() {

    this.recipesData
      .map( recipe => recipe.ingredients)
      .flat()
      .reduce((acc, el) => { // avoids duplicated item
        if (acc.indexOf(el) < 0) {
          acc.push(el);
        }
        return acc;
      }, [])
      .forEach(type => {

        const ingredient = type.ingredient;

        // Displays ustensils dropdown
        this.recipesPage.displayItemForDropdown(ingredient, this.$ingredientsList);
      });
  }

  displayAppliancesDropdownWithData() {

    this.recipesData
      .map( recipe => recipe.appliance)
      .flat()
      .reduce((acc, el) => { // avoids duplicated item
        if (acc.indexOf(el) < 0) {
          acc.push(el);
        }
        return acc;
      }, [])
      .forEach(appliance => {

        // Displays ustensils dropdown
        this.recipesPage.displayItemForDropdown(appliance, this.$appliancesList);
      });
  }

  displayUstensilsDropdownWithData() {

    this.recipesData
      .map( recipe => recipe.ustensils)
      .flat()
      .reduce((acc, el) => { // avoids duplicated item
        if (acc.indexOf(el) < 0) {
          acc.push(el);
        }
        return acc;
      }, [])
      .forEach(ustensil => {

        // Displays ustensils dropdown
        this.recipesPage.displayItemForDropdown(ustensil, this.$ustensilsList);
      });
  }
}
const recipesApp = new RecipesApp();
recipesApp.init();