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
    this.$form = document.querySelector('#main_search');
    this.$userInput = document.querySelector('#recipes_search');
    this.$recipeCards = document.querySelector('.recipe-cards');
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

    // Select boxes
    const dropdownList = new DropdownList();
    dropdownList.displaySelectBoxesWithData(this.recipesData);

    // Cards
    this.displayRecipeCardsWithData();

    // Main search bar
    this.isUserInputValueMatches();

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

  isUserInputValueMatches() {

    this.$userInput.addEventListener('input', (e) => {
      const userInputValue = e.target.value;

      this.displayMatchingRecipeBySearchBar(e);

      if (this.$form.dataset.validInput === 'true') {

        this.addCounterOnMachtingRecipe(userInputValue);
  
        this.sortRecipesByDescendingMatching();
  
        this.recipesPage.displayMatchingRecipesCounter(this.recipesData);
      }
    });
  }

  /**
   * Displays matching recipe
   * By main search bar
   * @param {Event & {target: HTMLInputElement}} e 
   */
  displayMatchingRecipeBySearchBar(e) {

    const binarySearch = new BinarySearch();
    const userInputValue = e.target.value;

    const isInputValid = binarySearch.inputValidation(userInputValue);

    if (isInputValid) {

      const userInputMatchingData = binarySearch.isUserValueMatches(userInputValue, this.recipesData, 0, this.recipesData.length - 1);
  
      this.$recipeCards.innerHTML = '';
  
      userInputMatchingData
        .forEach(recipe => {
  
          // Displays recipe card
          const recipeCard = new RecipeCard(recipe);
          const card = recipeCard.createRecipeCard();
          this.recipesPage.displayRecipeCard(card);
        });
    } else {
      return;
    }
  }

  /**
   * 
   * @param {string} target 
   */
  addCounterOnMachtingRecipe(target) {

    this.$recipeCards.querySelectorAll('article')
      .forEach(card => {

        const cardTextContent = card.textContent.toLowerCase();

        if (cardTextContent.includes(target)) {

          let position = cardTextContent.indexOf(target);
          let count = 0;

          while (position !== -1) {
            count++;
            position = cardTextContent.indexOf(target, position + 1);
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

    const sorted = containerArray
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

    sorted
      .forEach(el => cardsContainer.append(el));
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