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
    this.$userInput = document.querySelector('#recipes_search');
    this.$ingredientsList = document.querySelector('#ingredients_list');
    this.$appliancesList = document.querySelector('#appliances_list');
    this.$ustensilsList = document.querySelector('#ustensils_list');
    this.$ingredientsSelect = document.querySelector('select#ingredients');
    this.$appliancesSelect = document.querySelector('#appliances');
    this.$ustensilsSelect = document.querySelector('#ustensils');
    this.$recipeCards = document.querySelector('.recipe-cards');
  }

  async init() {
    const recipesData = await this.dataApi.recipesFetch();

    // this.recipesData = recipesData
    //   .map(recipe => new RecipeFactories(recipe, 'recipe'));

    this.recipesData = recipesData
      .map(recipe => {
        const ingredient = recipe.ingredients
          .map(el => el.ingredient)
          .flat()

        return {
          ...recipe,
          search: `${recipe.name} ${recipe.description} ${ingredient}`
        }
      });

    // Select boxes
    this.displayIngredientsDropdownWithData();
    this.displayAppliancesDropdownWithData();
    this.displayUstensilsDropdownWithData();

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

      this.addCounterOnMachtingRecipe(userInputValue);

      this.sortRecipeByDescendingMatching();

      this.recipesPage.displayMatchingRecipesCounter(this.recipesData);
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

    const userInputMatchingData = binarySearch.isUserValueMatches(userInputValue, this.recipesData, 0, this.recipesData.length - 1);

    this.$recipeCards.innerHTML = '';

    userInputMatchingData
      .forEach(recipe => {

        // Displays recipe card
        const recipeCard = new RecipeCard(recipe);
        const card = recipeCard.createRecipeCard();
        this.recipesPage.displayRecipeCard(card);
      });
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
  sortRecipeByDescendingMatching() {
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
   * Returns an array of not duplicated data with first letter as uppercase for dropdowns
   * Data about ingredients, appliances and ustensils of recipes
   * @param {string} key 
   * @param {string | undefined} value 
   * @returns Array - acc
   */
  recipesDataForDropdown(key, value) {
    return this.recipesData
      .map(recipe => recipe[`${key}`])
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