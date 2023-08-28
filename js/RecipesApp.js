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
    this.dropdownList = new DropdownList();
    this.filtertags = new FilterTags();
    this.advancedFilterSearchBar = new AdvancedFilterSearchBar();

    // DOM
    this.$form = document.querySelector('#main_search');
    this.$userMainInput = document.querySelector('#recipes_search');
    this.$advancedFilters = document.querySelector('.advanced-filters');
    this.$recipeCards = document.querySelector('.recipe-cards');
    this.$advancedFilterInputs = this.$advancedFilters.querySelectorAll('li input');
    this.closeBtnOnMainSearchBar = this.$form.querySelector('button');
    this.$tagsContainer = document.querySelector('#filter_tags');
  }

  async init() {
    const recipesData = await this.dataApi.recipesFetch();

    recipesData
      .map(recipe => new RecipeFactories(recipe, 'recipe'));

    this.recipesData = recipesData
      .map(recipe => {
        const ingredient = recipe.ingredients
          .map(el => el.ingredient);

        return {
          ...recipe,
          ingredientOnly: ingredient,
          search: `${recipe.name} ${recipe.description} ${ingredient}`,
          advancedSearch: `${ingredient} ${recipe.appliance} ${recipe.ustensils}`
        }
      });

    // Main search bar
    this.handleMatchingDataByMainSearchBar();

    // Dropdown of advanced filters
    this.displayInitialDropDownListOnAdvancedFilters();
    this.handleMatchingDataOnDropdownsAndTagsByAdvancedFilters();

    // Recipe cards
    this.handleRecipeCardsData();

    // Filter tags
    this.filtertags.displayFilterTagsByDropdownList();

    this.observeTagsChangeToUpdateRecipes();

    this.observeClosingBtnOnMainSearchBar();
  }

  /**
   * Displays matching recipes, update dropdown lists, displays tags
   * from main search bar
   * and add counter on the cards to sort recipes by descending matching
   * @see displayMatchingRecipeByMainSearchBar
   * @see handleDisplayingRecipes
   */
  handleMatchingDataByMainSearchBar() {

    this.$userMainInput.addEventListener('input', (e) => {

      const accents = /[\u0300-\u036f]/g;

      const userInputValue = e.target.value
        .normalize('NFD')
        .replace(accents, '')
        .toLowerCase();

      this.displayMatchingRecipeByMainSearchBar(userInputValue);
      this.handleDisplayingRecipes(this.$userMainInput, userInputValue);
    });
  }

  /**
   * Displays matching recipes
   * And matching ingredients, appliances and ustensils on select boxes
   * from main search bar
   * @param {Event & {eventTargetValue: HTMLInputElement}} eventTargetValue
   * @see displayMatchingRecipes
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

  /**
   * Displays matching recipes, update dropdown lists
   * displays tags
   * Gets matchingIngredients, matchingAppliances, matchingUstensils
   * @param {Array | string} matchingData
   * @see updateDropdownLists
   */
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

    this.matchingIngredients = matchingIngredients.flat();
    this.matchingAppliances = matchingAppliances;
    this.matchingUstensils = matchingUstensils.flat();

    this.updateDropdownLists(
      this.matchingIngredients,
      this.matchingAppliances,
      this.matchingUstensils);

    this.filtertags.displayFilterTagsByDropdownList();
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
   * Updates dropdown of advanced filters with matching data
   * @param {Array | string} matchingIngredients 
   * @param {Array | string} matchingAppliances 
   * @param {Array | string} matchingUstensils 
   */
  updateDropdownLists(matchingIngredients, matchingAppliances, matchingUstensils) {
    this.dropdownList.displayAvailableMatchesOnDropdown(
      matchingIngredients,
      matchingAppliances,
      matchingUstensils);
  }

  /**
   * Add counter on the cards to sort recipes by descending matching
   * @param {HTMLElement} searchInput
   * @param {Event & {eventTargetValue: HTMLInputElement}} eventTargetValue
   * @see addCounterOnMachtingRecipe
   * @see sortRecipesByDescendingMatching
   */
  handleDisplayingRecipes(searchInput, eventTargetValue) {

    if (searchInput.dataset.validInput === 'true') {

      this.addCounterOnMachtingRecipe(eventTargetValue);

      this.sortRecipesByDescendingMatching();

      this.recipesPage.displayMatchingRecipesCounter(this.recipesData);
    }
  }

  /**
   * Add counter of matching data on card
   * @param {Event & {eventTargetValue: HTMLInputElement}} eventTargetValue 
   */
  addCounterOnMachtingRecipe(eventTargetValue) {

    const punctuation = /[\.,?!]/g;
    const accents = /[\u0300-\u036f]/g;

    this.$recipeCards.querySelectorAll('article')
      .forEach(card => {

        const cardTextContent = card.textContent
          .replace(punctuation, ' ')
          .normalize('NFD')
          .replace(accents, '')
          .toLowerCase();

        if (cardTextContent.includes(eventTargetValue)) {

          let position = cardTextContent.indexOf(eventTargetValue);
          let count = 0;

          while (position !== -1 && position < cardTextContent.length) {
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
  displayInitialDropDownListOnAdvancedFilters() {

    this.advancedFilterSearchBar.cleanEachSelectBoxes();

    this.dropdownList.displayDataOnDropdownLists(this.recipesData);
  }

  /**
   * Update dropdown lists from matching or full data, 
   * displays tags
   * from advanced filters
   * @see handleMatchingResultByAdvancedFilters
   */
  handleMatchingDataOnDropdownsAndTagsByAdvancedFilters() {

    this.$advancedFilterInputs.forEach(input => {

      this.handleMatchingResultByAdvancedFilters(input);
    });
  }

  /**
   * 
   * @param {HTMLElement} input User input on advanced filter
   * @see updateDropdownByMatchingData
   * @see updateDropdownByFullData
   */
  handleMatchingResultByAdvancedFilters(input) {

    input.addEventListener('input', (e) => {

      const accents = /[\u0300-\u036f]/g;

      const userInputValue = e.target.value
        .normalize('NFD')
        .replace(accents, '')
        .toLowerCase();

      if (this.matchingIngredients && this.matchingAppliances && this.matchingUstensils) {

        this.updateDropdownByMatchingData(userInputValue, input);

      } else {

        this.updateDropdownByFullData(userInputValue, input);
      }

    });
  }

  /**
   * 
   * @param {Event & {eventTargetValue: HTMLInputElement}} eventTargetValue
   * @param {HTMLElement} input 
   */
  updateDropdownByMatchingData(eventTargetValue, input) {

    const matchingDatas = [
      this.matchingIngredients,
      this.matchingAppliances,
      this.matchingUstensils
    ];

    const isInputValid = this.advancedFilterSearchBar.IsUserInputValid(eventTargetValue, input);

    if (isInputValid) {

      this.dropdownList.updateDropdownDataByAdvancedFilterSearchBar(matchingDatas, eventTargetValue);

      this.filtertags.displayFilterTagsByDropdownList();

    } else {
      return;
    }
  }

  /**
   * 
   * @param {Event & {eventTargetValue: HTMLInputElement}} eventTargetValue
   * @param {HTMLElement} input 
   */
  updateDropdownByFullData(eventTargetValue, input) {

    const isInputValid = this.advancedFilterSearchBar.IsUserInputValid(eventTargetValue, input);

    if (isInputValid) {

      this.dropdownList.updateDropdownDataByAdvancedFilterSearchBar(this.recipesData, eventTargetValue);

      this.filtertags.displayFilterTagsByDropdownList();

    } else {
      return;
    }
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
   * Observes changing tags
   * to handle recipes
   * @see displayRecipesByFilterTags
   * @external MutationObserver
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe}
   */
  observeTagsChangeToUpdateRecipes() {

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
        this.handlerecipesByFilterTags(mutation.target.children);
      }
    }

    // Creates an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Starts observing the target node for configured mutations
    // this.$tagsContainer: the node that will be observed for mutations
    observer.observe(this.$tagsContainer, config);
  }

  /**
   * Displays matching recipes by filter tags
   * from main search bar or not
   * Displays recipe counter
   * Resets interface if there is no more tag
   * Removes counter on the cards
   * @see isTagMatchingWithRecipesData
   * @see displayMatchingRecipes
   * @see resetInterfaceByEndingTag
   * @see removeCounterOnMachtingRecipeCards
   */
  handlerecipesByFilterTags() {

    const matchingDataTags = this.isTagMatchingWithRecipesData();

    this.displayMatchingRecipes(matchingDataTags);

    this.recipesPage.displayMatchingRecipesCounterByFilter(
      this.recipesData,
      matchingDataTags.length);

    this.resetInterfaceByEndingTag();

    this.removeCounterOnMachtingRecipeCards();
  }

  /**
   * Returns array of matching data from tags
   * from main search bar or not
   * @returns {Array | Object} - result
   * @see getmatchingDatasInDropdowns
   */
  isTagMatchingWithRecipesData() {

    let dataTags = [];
    const userMainInputValue = this.$userMainInput.value;
    const matchingDatas = this.getmatchingDatasInDropdowns(userMainInputValue);

    this.pushTagInArray(dataTags, userMainInputValue, matchingDatas);

    const result = this.recipesData.filter(el => {

      const filterData = el.advancedSearch.toLowerCase();

      // Case using advanced filter from main search bar
      if (userMainInputValue !== '') {

        if (filterData.includes(userMainInputValue)) {

          return dataTags.every(dataTag =>
            filterData.includes(dataTag.toLowerCase()));
        }
      } else { // Case using advanced filter only
        return dataTags.every(dataTag =>
          filterData.includes(dataTag.toLowerCase()));
      }
    });

    return result;
  }

  /**
   * Returns an array of all matching data in dropdown
   * @param {Event & {userInputValue: HTMLInputElement}} userInputValue
   * @returns {Array | string} result
   */
  getmatchingDatasInDropdowns(userInputValue) {

    const matchingDropdownDatas = [
      this.matchingIngredients,
      this.matchingAppliances,
      this.matchingUstensils
    ];

    if (userInputValue !== '') {

      const matchingDatas = matchingDropdownDatas.flat();

      const result = matchingDatas
        .map(el => el.charAt(0).toUpperCase() + el.slice(1));

      return result;
    } else {
      return;
    }
  }

  /**
   * Returns tag that matches with advanced filter data only
   * Or with advanced filter data from main search bar
   * @param {Array} array Empty array to get data tag
   * @param {Event & {userInputValue: HTMLInputElement}} userInputValue
   * @param {Array} data Array of all matching data in dropdown
   */
  pushTagInArray(array, userInputValue, data) {

    const tags = this.$tagsContainer.querySelectorAll('li');

    tags
      .forEach(tag => {

        // Case using advanced filter from main search bar
        if (userInputValue !== '') {

          if (data.includes(tag.textContent.trim())) {
            return array.push(tag.textContent.trim());
          }
        } else { // Case using advanced filter only
          return array.push(tag.textContent.trim());
        }
      });
  }

  /**
   * Resets interface if there is no more tag
   */
  resetInterfaceByEndingTag() {

    const userInputValue = this.$userMainInput.value;

    if (this.$tagsContainer.children.length == 0) {

      this.handleDisplayingRecipes(this.$userMainInput, userInputValue);
    }
  }

  /**
   * Removes counter on the cards
   */
  removeCounterOnMachtingRecipeCards() {

    const tags = this.filtertags.$tagsContainer.children;
    const cards = this.$recipeCards.children;

    if (tags.length >= 0) {
      for (const card of cards) {
        card.removeAttribute('data-matches');
      }
    }
  }

  /**
   * Observes changing closing button on main search bar
   * to reset interface
   * @external MutationObserver
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe}
   * @see resetInterfaceByMainSearchbar
   */
  observeClosingBtnOnMainSearchBar() {

    // Options for the observer (which mutations to observe)
    const config = {
      attributes: true
    }

    // Callback function to execute when mutations are observed
    const callback = (mutationList) => {

      // Finds mutation about selected attribute
      const mutation = mutationList.find(mutation => mutation.type === 'attributes'
        && mutation.attributeName === 'data-clicked');

      if (mutation) {
        this.resetInterfaceByMainSearchbar(mutation.attributeName);
      }
    }

    // Creates an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Starts observing the target node for configured mutations
    // this.closeBtnOnMainSearchBar: the node that will be observed for mutations
    observer.observe(this.closeBtnOnMainSearchBar, config);
  }

  /**
   * Resets interface from closing button on main search bar
   * @see handleRecipeCardsData
   * @see displayInitialDropDownListOnAdvancedFilters
   */
  resetInterfaceByMainSearchbar() {

    const closeBtn = this.$tagsContainer.querySelectorAll('.btn-close');

    if (this.$form.querySelector('button').dataset.clicked === 'true') {

      this.$userMainInput.dataset.validInput = 'false';

      this.$form.querySelector('label').classList.replace('btn-primary', 'btn-secondary');
      this.$form.querySelector('label svg').style.fill = '#fff';

      document.querySelector('.recipe-cards').innerHTML = '';

      this.handleRecipeCardsData();
      this.displayInitialDropDownListOnAdvancedFilters();
      this.filtertags.displayFilterTagsByDropdownList();

      // Closes tags
      closeBtn
        .forEach(btn => btn.click());
    }
  }
}
const recipesApp = new RecipesApp();
recipesApp.init();