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

    // DOM
    this.$searchFilterInputs = document.querySelectorAll('.search-filters li input');
  }

  async init() {
    const recipesData = await this.dataApi.recipesFetch();

    // this.recipesData = recipesData
    //   .map(recipe => new RecipeFactories(recipe, 'recipe'));

    this.recipesData = recipesData
      .map(recipe => {
        const ingredient = recipe.ingredients
          .map(el => el.ingredient);

        return {
          ...recipe,
          search: `${recipe.name} ${recipe.description} ${ingredient}`
        }
      });

    // Cards
    this.displayRecipeCardsWithData();

    // Main search bar
    new MainSearchBar();

    // Select boxes
    this.displayDropDownListOnSearchFilters();
    this.isUserInputValueMatchesOnSearchFilter();

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

    this.recipesPage.displayRecipesCounter(this.recipesData);
  }

  /**
   * Displays initial data on dropdown search filter
   */
  displayDropDownListOnSearchFilters() {
    const dataDropdownList = new DataDropdownList();
    dataDropdownList.displaySelectBoxesWithData(this.recipesData);
  }
  
  isUserInputValueMatchesOnSearchFilter() {    
    const dropdownSearchFilter = new DropdownSearchFilter();

    this.$searchFilterInputs.forEach(input => {

      input.addEventListener('input', (e) => {

        const userInputValue = e.target.value;
  
        const isInputValid = dropdownSearchFilter.IsUserInputValid(userInputValue, input);
  
        if (isInputValid) {
  
        }
      });
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