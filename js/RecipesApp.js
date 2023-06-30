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

  /**
   * Returns an array of not duplicated data with first letter as uppercase
   * Data for ingredients, appliances and ustensils dropdowns
   * @param {string} key 
   * @param {string | undefined} value 
   * @returns Array - acc
   */
  recipesDataForDropdown(key, value) {
    return this.recipesData
      .map( recipe => recipe[`${key}`])
      .flat()
      .reduce((acc, el) => { // avoids duplicated item
        let data;
        if (value) {          
          data = el[`${value}`].charAt(0).toUpperCase() + el[`${value}`].slice(1);
        } else {
          data = el.charAt(0).toUpperCase() + el.slice(1);
        }
        if (acc.indexOf(data) < 0) {
          acc.push(data);
        }
        return acc;
      }, []);
  }

  /**
   * @see recipesDataForDropdown
   */
  displayIngredientsDropdownWithData() {

    this.recipesDataForDropdown('ingredients', 'ingredient')
      .forEach(ingredient => {

        // Displays ingredients dropdown
        this.recipesPage.displayItemForDropdown(ingredient, this.$ingredientsList);

        // Displays ingredients option
        this.recipesPage.displayOptionForDropdown(ingredient, this.$ingredientsSelect);
      });
  }

  /**
   * @see recipesDataForDropdown
   */
    displayAppliancesDropdownWithData() {

    this.recipesDataForDropdown('appliance', undefined)
      .forEach(appliance => {

        // Displays appliances dropdown
        this.recipesPage.displayItemForDropdown(appliance, this.$appliancesList);

        // Displays appliances option
        this.recipesPage.displayOptionForDropdown(appliance, this.$appliancesSelect);
      });
  }

  /**
   * @see recipesDataForDropdown
   */
    displayUstensilsDropdownWithData() {

    this.recipesDataForDropdown('ustensils', undefined)
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