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
  }

  async init() {
    const recipesData = await this.dataApi.recipesFetch();

    this.recipesData = recipesData
      .map(recipe => new RecipeFactories(recipe, 'recipe'));

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

  isUserInputValueMatches() {

    this.$userInput.addEventListener('input', (e) => {

      this.displayMatchingRecipe(e);

      this.sortRecipeByDescendingMatching();
    });
  }

  sortRecipeByDescendingMatching() {
    const cardsContainer =  document.querySelector('.recipe-cards');
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
      .sort((a,b) => {
        return b.dataset.matches - a.dataset.matches;
      });
      sorted
        .forEach(el => cardsContainer.append(el));
  }

  /**
   * Displays matching recipe
   * By main search bar
   * @param {Event & {target: HTMLInputElement}} e 
   */
  displayMatchingRecipe(e) {
    const cards =  Array.from(document.querySelectorAll('.recipe-cards article'));

    cards
      .forEach(card => {
        const recipesDataForMainSearchBar = this.recipesDataForMainSearchBar();
        const linearSearch = new LinearSearch;
        const userInputValue = e.target.value;
        const cardTextContent = card.textContent.toLowerCase();

        const userInputMatchingList = linearSearch.isUserValueMatchesByRegex(userInputValue, recipesDataForMainSearchBar);

        const isUserInputMatching = userInputMatchingList
          .some(element => card.textContent.includes(element));
      
        if (isUserInputMatching) {
          card.style.display = 'block';

          let position = cardTextContent.indexOf(userInputValue);
          let count = 0;

          while (position !== -1) {
            count++;
            position = cardTextContent.indexOf(userInputValue, position + 1);
          }
          // Number of occurrences of user input value matching
          card.dataset.matches = count;
        } else {
          card.dataset.matches = 0;
          card.style.display = 'none';
        }
      });   
  }

  /**
   * Returns an array of not duplicated data for search form 
   * Data about name, description and ingredients of recipes
   * @returns Array - recipesDataForMainSearchBar
   */
  recipesDataForMainSearchBar() {

    let array = [];

    // Ingredient data
    this.recipesData
      .map(el => el.ingredients)
      .flat()
      .forEach(type => array.push(type.ingredient));

    // Name and description data
    this.recipesData
      .map(recipe => array.push(recipe.name, recipe.description));

    // Avoids duplicated data
    const recipesDataForMainSearchBar = array
      .reduce((acc, el) => {
        const word = el.charAt(0).toLowerCase() + el.slice(1);
        if (acc.indexOf(word) < 0) {
          acc.push(word);
        }
        return acc;
      }, []);

    return recipesDataForMainSearchBar;
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
   * Returns an array of not duplicated data with first letter as uppercase for dropdowns
   * Data about ingredients, appliances and ustensils of recipes
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