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
    new MainSearchBar();

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