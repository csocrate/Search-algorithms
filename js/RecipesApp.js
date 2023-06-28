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

    this.$ingredientsSelect = document.querySelector('select#ingredients');
    this.$appliancesSelect = document.querySelector('#appliances');
    this.$ustensilsSelect = document.querySelector('#ustensils');
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

        // Displays ingredients dropdown
        this.recipesPage.displayItemForDropdown(ingredient, this.$ingredientsList);

        // Displays ingredients option
        this.recipesPage.displayOptionForDropdown(ingredient, this.$ingredientsSelect);
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

        // Displays appliances dropdown
        this.recipesPage.displayItemForDropdown(appliance, this.$appliancesList);

        // Displays appliances option
        this.recipesPage.displayOptionForDropdown(appliance, this.$appliancesSelect);
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

        // Displays ustensil dropdown
        this.recipesPage.displayItemForDropdown(ustensil, this.$ustensilsList);

        // Displays ustensil option
        this.recipesPage.displayOptionForDropdown(ustensil, this.$ustensilsSelect);
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