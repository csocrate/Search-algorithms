/**
 * ------------------------------------------------------------
 * Les Petits Plats components/DropdownList.js
 * ------------------------------------------------------------
 */

 class DropdownList {

  constructor() {
    this.recipesPage = new RecipesPage();

    //DOM
    this.$ingredientsCustomSelect = document.querySelector('#ingredients_list');
    this.$appliancesCustomSelect = document.querySelector('#appliances_list');
    this.$ustensilsCustomSelect = document.querySelector('#ustensils_list');
    this.$ingredientsSelect = document.querySelector('select#ingredients');
    this.$appliancesSelect = document.querySelector('select#appliances');
    this.$ustensilsSelect = document.querySelector('select#ustensils');
  }

  /**
   * @see displayItemsDropdownWithData
   */
  displaySelectBoxesWithData(recipesData) {

    this.displayItemsDropdownWithData(
      recipesData,
      'ingredients',
      'ingredient',
      this.$ingredientsCustomSelect,
      this.$ingredientsSelect);

    this.displayItemsDropdownWithData(
      recipesData,
      'appliance',
      undefined,
      this.$appliancesCustomSelect,
      this.$appliancesSelect);

    this.displayItemsDropdownWithData(
      recipesData,
      'ustensils',
      undefined,
      this.$ustensilsCustomSelect,
      this.$ustensilsSelect);
  }

  /**
   * 
   * @param {Array} recipesData 
   * @param {string} key - 'ingredients', 'appliance', 'ustensils'
   * @param {string | undefined} value
   * @param {HTMLElement} customSelect
   * @param {HTMLElement} select
   * @see recipesDataForDropdown
   */
  displayItemsDropdownWithData(recipesData, key, value, customSelect, select) {

    this.recipesDataForDropdown(recipesData, key, value)
      .forEach(item => {

        // Displays items dropdown
        this.recipesPage.displayItemForDropdown(item, customSelect);

        // Displays items option
        this.recipesPage.displayOptionForDropdown(item, select);
      });
  }

  /**
   * Returns an array of not duplicated data with first letter as uppercase for dropdowns
   * Data about ingredients, appliances and ustensils of recipes
   * @param {Array} recipesData 
   * @param {string} key 
   * @param {string | undefined} value 
   * @returns Array - acc
   */
  recipesDataForDropdown(recipesData, key, value) {
    return recipesData
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
   * @see displayMatchingItemsDropdownWithData
   */
  displayMatchingItemsOnSelectBoxes(matchingIngredients, matchingAppliances, matchingUstensils){

    this.displayMatchingItemsDropdownWithData(
      matchingIngredients,
      this.$ingredientsCustomSelect,
      this.$ingredientsSelect);

    this.displayMatchingItemsDropdownWithData(
      matchingAppliances,
      this.$appliancesCustomSelect,
      this.$appliancesSelect);

    this.displayMatchingItemsDropdownWithData(
      matchingUstensils,
      this.$ustensilsCustomSelect,
      this.$ustensilsSelect);
  }

  /**
   * 
   * @param {Array} matchingRecipesDataItem
   * @param {HTMLElement} customSelect
   * @param {HTMLElement} select
   * @see matchingRecipesDataForDropdown
   */
  displayMatchingItemsDropdownWithData(matchingRecipesDataItem, customSelect, select) {

    customSelect.innerHTML = '';
    select.innerHTML = '';

    this.matchingRecipesDataForDropdown(matchingRecipesDataItem)
      .forEach(item => {

        // Displays ingredients dropdown
        this.recipesPage.displayItemForDropdown(item, customSelect);

        // Displays ingredients option
        this.recipesPage.displayOptionForDropdown(item, select);
      });
  }

  /**
   * Returns an array of not duplicated data with first letter as uppercase for dropdowns
   * Data about matching ingredients, appliances and ustensils 
   * About matching recipes from main search bar
   * @param {Array} dataArray
   * @returns dataArray - acc
   */
  matchingRecipesDataForDropdown(matchingRecipesDataItem) {
    return matchingRecipesDataItem
      .reduce((acc, el) => { // avoids duplicated item

        let data;

        data = el.charAt(0).toUpperCase() + el.slice(1);

        if (acc.indexOf(data) < 0) {
          acc.push(data);
        }
        return acc;

      }, []);
  }
}