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
    this.filtertags = new FilterTags();

    // DOM
    this.$form = document.querySelector('#main_search');
    this.$userInput = document.querySelector('#recipes_search');
    this.$recipeCards = document.querySelector('.recipe-cards');
    this.$advancedFilterInputs = document.querySelectorAll('.search-filters li input');
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
          search: `${recipe.name} ${recipe.description} ${ingredient}`,
          filter: `${ingredient} ${recipe.appliance} ${recipe.ustensils}`
        }
      });

    // Main search bar
    this.handleMatchingDataByMainSearchBar();

    // Dropdown of advanced filters
    this.displayDropDownListOnAdvancedFilters();
    this.handleMatchingDataOnDropdownsAndTagsByAdvancedFilters();

    // Recipe cards
    this.handleRecipeCardsData();

    // Filter tags
    this.filtertags.displayFilterTagsByDropdownList();
    this.observeTagsChangeToUpdateRecipes();
  }

  handleMatchingDataByMainSearchBar() {

    this.$userInput.addEventListener('input', (e) => {
      const userInputValue = e.target.value.toLowerCase();

      this.displayMatchingRecipeByMainSearchBar(userInputValue);
      this.handleDisplayingRecipes(this.$userInput, userInputValue);
    });
  }

  /**
   * Displays matching recipe
   * And matching ingredients, appliances and ustensils on select boxes
   * from main search bar
   * @param {Event & {eventTargetValue: HTMLInputElement}} eventTargetValue
   */
  displayMatchingRecipeByMainSearchBar(eventTargetValue) {

    const mainSearchBarMatches = new MainSearchBarMatches();

    const isInputValid = mainSearchBarMatches.inputValidation(eventTargetValue);

    if (isInputValid) {

      const userInputMatchingData = mainSearchBarMatches.isDataSearchMatches(eventTargetValue, this.recipesData);

      this.displayMatchingRecipes(userInputMatchingData);

    } else {
      return;
    }
  }

  displayMatchingRecipes(matchingData) {

    this.$recipeCards.innerHTML = '';

    let matchingIngredients = [];
    let matchingAppliances = [];
    let matchingUstensils = [];

    matchingData
      .forEach(recipe => {

        this.displayRecipeCard(recipe);

        // Pushes matching data
        matchingIngredients.push(recipe.ingredientOnly);
        matchingAppliances.push(recipe.appliance);
        matchingUstensils.push(recipe.ustensils);

      });

    this.updateDropdownLists(
      matchingIngredients.flat(),
      matchingAppliances,
      matchingUstensils.flat());

    this.filtertags.displayFilterTagsByDropdownList();
  }

  displayRecipeCard(data) {

    const recipeCard = new RecipeCard(data);
    const card = recipeCard.createRecipeCard();
    this.recipesPage.displayRecipeCard(card);
  }

  /**
   * Updates dropdown of advanced filters with matching data
   * From main search bar
   */
  updateDropdownLists(matchingIngredients, matchingAppliances, matchingUstensils) {
    const dropdownList = new DropdownList();
    dropdownList.displayAvailableMatchesOnDropdownByMainSearchBar(
      matchingIngredients,
      matchingAppliances,
      matchingUstensils);
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
   * 
   * @param {Event & {eventTargetValue: HTMLInputElement}} eventTargetValue 
   */
  addCounterOnMachtingRecipe(eventTargetValue) {

    this.$recipeCards.querySelectorAll('article')
      .forEach(card => {

        const cardTextContent = card.textContent.trim().toLowerCase();

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
  displayDropDownListOnAdvancedFilters() {
    const dropdownList = new DropdownList();
    dropdownList.displayDataOnDropdownLists(this.recipesData);
  }

  /**
   * @see handleMatchingResultByAdvancedFilters
   */
  handleMatchingDataOnDropdownsAndTagsByAdvancedFilters() {

    this.$advancedFilterInputs.forEach(input => {

      this.handleMatchingResultByAdvancedFilters(input);
    });
  }

  handleMatchingResultByAdvancedFilters(input) {

    input.addEventListener('input', (e) => {
      const userInputValue = e.target.value;

      this.displayMatchingDataDropdownByAdvancedFilters(userInputValue, input);
      this.filtertags.displayFilterTagsByDropdownList();
    });
  }

  handleRecipeCardsData() {
    this.recipesData
      .forEach(recipe => {

        this.displayRecipeCard(recipe);
      });

    this.recipesPage.displayRecipesCounter(this.recipesData);
  }

  observeTagsChangeToUpdateRecipes() {

    // Selects the node that will be observed for mutations
    const tags = document.querySelector('#filter_tags');

    // Options for the observer (which mutations to observe)
    const config = {
      childList: true,
      subtree: true
    }

    // Callback function to execute when mutations are observed
    const callback = (mutationList) => {

      // Finds mutation about selected attribute
      const mutation = mutationList.find(mutation => mutation.type === 'childList'
        && mutation.target.children);

      if (mutation) {
        this.displayRecipesByFilterTags(mutation.target.children);
      }
    }

    // Creates an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Starts observing the target node for configured mutations
    observer.observe(tags, config);
  }

  displayRecipesByFilterTags() {

    const matchingDataTags = this.isTagMatchingWithRecipesData();

    this.displayMatchingRecipes(matchingDataTags);

    this.recipesPage.displayMatchingRecipesCounterByFilter(
      this.recipesData,
      matchingDataTags.length);
  }

  isTagMatchingWithRecipesData() {

    let dataTag = [];

    const tags = document.querySelectorAll('#filter_tags li');

    tags
      .forEach(tag => dataTag.push(tag.textContent.trim()));

    const result = this.recipesData.filter(el => {

      const filterData = el.filter.toLowerCase();
      const tags = dataTag;

      return tags.every(tag =>
        filterData.includes(tag.toLowerCase()));
    });

    return result;
  }

  /**
   * 
   * @param {Event & {eventTargetValue: HTMLInputElement}} eventTargetValue
   * @param {HTMLElement} input 
   */
  displayMatchingDataDropdownByAdvancedFilters(eventTargetValue, input) {

    const advancedFilterSearchBar = new advancedFilterSearchBar();

    const isInputValid = advancedFilterSearchBar.IsUserInputValid(eventTargetValue, input);

    if (isInputValid) {

      const dropdownList = new DropdownList();

      dropdownList.updateDropdownDataByAdvancedFilterSearchBar(this.recipesData, eventTargetValue);

    } else {
      return;
    }
  }
}
const recipesApp = new RecipesApp();
recipesApp.init();