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
    this.dropdownList = new DropdownList();
    this.tags = new Array();

    // DOM
    this.$userMainInput = document.querySelector('#recipes_search');
    this.$searchFilterInputs = document.querySelectorAll('.advanced-filters li input');
  }

  async init() {
    const recipesData = await this.dataApi.recipesFetch();

    this.recipesData = recipesData
      .map(recipe => new RecipeFactories(recipe, 'recipe'));

    // Cards
    this.handleRecipeCardsData();

    // Main search bar
    this.isUserInputValidOnMainSearchBar();

    // Select boxes
    this.displayDropDownListOnSearchFilters();
    this.isUserInputValidOnAdvancedFilter();

    // Tags
    this.displayTags();
  }

  /**
   * Displays recipe cards
   * and recipe counter
   * @see displayRecipeCard
   */
  handleRecipeCardsData() {
    this.recipesData
      .forEach(recipe => {

        this.displayRecipeCard(recipe);
      });

    this.recipesPage.displayRecipesCounter(this.recipesData);
  }

  /**
   * Displays recipe cards with data
   * @param {Object} data from array
   */
  displayRecipeCard(data) {

    const recipeCard = new RecipeCard(data);
    const card = recipeCard.createRecipeCard();
    this.recipesPage.displayRecipeCard(card);
  }

  /**
   * Checks if user input is valid
   * from main search bar
   */
  isUserInputValidOnMainSearchBar() {
    const mainSearchBar = new MainSearchBar();

    this.$userMainInput.addEventListener('input', (e) => {

      const userInputValue = e.target.value;

      mainSearchBar.inputValidation(userInputValue);
    });
  }

  /**
   * Displays initial data on dropdown search filter
   */
  displayDropDownListOnSearchFilters() {
    this.dropdownList.displaySelectBoxesWithData(this.recipesData);
  }

  /**
   * Checks if user input is valid
   * from filter search bars
   */
  isUserInputValidOnAdvancedFilter() {
    const advancedFilterSearchBar = new AdvancedFilterSearchBar();

    this.$searchFilterInputs.forEach(input => {

      input.addEventListener('input', (e) => {

        const userInputValue = e.target.value;

        advancedFilterSearchBar.IsUserInputValid(userInputValue, input);
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

  /**
   * Items for tag templates
   * @see displayActiveTags
   */
  displayTags() {
    this.tags.push('item 1', 'item 2', 'item 3');
    const tags = this.tags;
    this.displayActiveTags(tags);
  }
}
const recipesApp = new RecipesApp();
recipesApp.init();