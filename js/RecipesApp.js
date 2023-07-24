/**
 * ------------------------------------------------------------
 * Les Petits Plats RecipesApp.js
 * ------------------------------------------------------------
 */

class RecipesApp {
  recipesData = undefined;
  matchingIngredients = undefined;
  matchingAppliances = undefined;
  matchingUstensils = undefined;

  constructor() {
    this.dataApi = new DataApi('/data/recipes.json');
    this.recipesPage = new RecipesPage();
    this.tags = new Array();

    // DOM
    this.$form = document.querySelector('#main_search');
    this.$userInput = document.querySelector('#recipes_search');
    this.$recipeCards = document.querySelector('.recipe-cards');
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
          ingredientOnly: ingredient,
          search: `${recipe.name} ${recipe.description} ${ingredient}`
        }
      });

    // Cards
    this.displayRecipeCardsWithData();

    // Main search bar
    this.isUserInputValueMatchesOnMainSearchBar();

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

  isUserInputValueMatchesOnMainSearchBar() {

    this.$userInput.addEventListener('input', (e) => {
      const userInputValue = e.target.value;

      this.displayMatchingRecipeBySearchBar(userInputValue);
      this.handleDisplayingRecipes(this.$userInput, userInputValue);
    });
  }

  /**
   * 
   * @param {HTMLElement} searchInput
   * @param {Event & {eventTargetValue: HTMLInputElement}} eventTargetValue
   */
  handleDisplayingRecipes(searchInput, eventTargetValue) {

    if (searchInput.dataset.validInput === 'true') {

      this.addCounterOnMachtingRecipe(eventTargetValue);

      this.sortRecipesByDescendingMatching();

      this.recipesPage.displayMatchingRecipesCounter(this.recipesData);
    }
  }

  /**
   * Displays matching recipe
   * And matching ingredients, appliances and ustensils on select boxes
   * from main search bar
   * @param {Event & {eventTargetValue: HTMLInputElement}} eventTargetValue
   */
  displayMatchingRecipeBySearchBar(eventTargetValue) {

    const linearSearch = new LinearSearch();

    const isInputValid = linearSearch.inputValidation(eventTargetValue);

    if (isInputValid) {

      const userInputMatchingData = linearSearch.isUserValueMatchesByRegex(eventTargetValue, this.recipesData);
  
      this.$recipeCards.innerHTML = '';

      let matchingIngredients = [];
      let matchingAppliances = [];
      let matchingUstensils = [];
  
      userInputMatchingData
        .forEach(recipe => {
  
          // Displays recipe card
          const recipeCard = new RecipeCard(recipe);
          const card = recipeCard.createRecipeCard();
          this.recipesPage.displayRecipeCard(card);

          // Pushes matching data
          matchingIngredients.push(recipe.ingredientOnly);
          matchingAppliances.push(recipe.appliance);
          matchingUstensils.push(recipe.ustensils);
        });

      this.matchingIngredients = matchingIngredients.flat();
      this.matchingAppliances = matchingAppliances;
      this.matchingUstensils = matchingUstensils.flat();

      this.updateDropdownListsByMainSearchBar();

    } else {
      return;
    }
  }

  /**
   * 
   * @param {Event & {eventTargetValue: HTMLInputElement}} eventTargetValue 
   */
  addCounterOnMachtingRecipe(eventTargetValue) {

    this.$recipeCards.querySelectorAll('article')
      .forEach(card => {

        const cardTextContent = card.textContent.toLowerCase();

        if (cardTextContent.includes(eventTargetValue)) {

          let position = cardTextContent.indexOf(eventTargetValue);
          let count = 0;

          while (position !== -1) {
            count++;
            position = cardTextContent.indexOf(eventTargetValue, position + 1);
          }
          // Number of occurrences of user input value matching
          card.dataset.matches = count;
        } else {
          card.dataset.matches = 0;
        }
      });
  }

  /**
   * Sorts recipes by descending matching
   * To allow user to better find the recipe that may suit him
   */
  sortRecipesByDescendingMatching() {
    const cardsContainer = document.querySelector('.recipe-cards');
    const containerArray = Array.from(cardsContainer.children);

    const sortedRecipes = containerArray
      .filter(child => {
        if (child.hasAttribute('data-matches')) {
          const matches = child.dataset.matches > parseInt(0);
          if (matches) {
            return child;
          }
        }
      })
      .sort((a, b) => {
        return b.dataset.matches - a.dataset.matches;
      });

    sortedRecipes
      .forEach(el => cardsContainer.append(el));
  }

  /**
   * Displays initial data on dropdown search filter
   */
  displayDropDownListOnSearchFilters() {
    const dataDropdownList = new DataDropdownList();
    dataDropdownList.displayDataOnDropdownLists(this.recipesData);
  }

  /**
   * Updates dropdown search filters with matching data
   * From main search bar
   */
  updateDropdownListsByMainSearchBar() {
    const dataDropdownList = new DataDropdownList();
    dataDropdownList.displayAvailableMatchesOnDropdownByMainSearchBar(
      this.matchingIngredients,
      this.matchingAppliances,
      this.matchingUstensils);    
  }
  
  isUserInputValueMatchesOnSearchFilter() {

    this.$searchFilterInputs.forEach(input => {

      input.addEventListener('input', (e) => {
        const userInputValue = e.target.value;
        

        this.displayMatchingDataDropdownBySearchFilter(userInputValue, input);
        
        // this.handleDisplayingRecipes(input, userInputValue);
      });
    });
  }

  /**
   * 
   * @param {Event & {eventTargetValue: HTMLInputElement}} eventTargetValue
   * @param {HTMLElement} input 
   */
  displayMatchingDataDropdownBySearchFilter(eventTargetValue, input) {

    const dropdownSearchFilter = new DropdownSearchFilter();

    const isInputValid = dropdownSearchFilter.IsUserInputValid(eventTargetValue, input);

    if (isInputValid) {

      const dataDropdownList = new DataDropdownList();

      dataDropdownList.displayAvailableMatchesOnDropdownBySearchFilters(this.recipesData, eventTargetValue);

    } else {
      return;
    }
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