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
    this.tags = new Array();

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

    // Tags
    this.tags.push('item 1', 'item 2', 'item 3');
    const tags = this.tags;
    this.displayActiveTags(tags);
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

  /**
   * @type {(string|Array)}
   * @param {Object} items 
   */
  displayActiveTags(items) {    
    items
      .forEach(item => {
        const activeTag = new ActiveTag();
        const tag = activeTag.createActivetag(item);
        this.recipesPage.displayActiveTag(tag);
      });
  }
}
const recipesApp = new RecipesApp();
recipesApp.init();