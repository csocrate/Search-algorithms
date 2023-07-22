/**
 * ------------------------------------------------------------
 * Les Petits Plats components/DataDropdownList.js
 * ------------------------------------------------------------
 */

class DataDropdownList {

  constructor() {
    this.recipesPage = new RecipesPage();

    //DOM
    this.$ingredientsCustomSelect = document.querySelector('#ingredients_list');
    this.$appliancesCustomSelect = document.querySelector('#appliances_list');
    this.$ustensilsCustomSelect = document.querySelector('#ustensils_list');
    this.$ingredientsSelect = document.querySelector('select#ingredients');
    this.$appliancesSelect = document.querySelector('#appliances');
    this.$ustensilsSelect = document.querySelector('#ustensils');
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

        // Displays item on custom select
        this.recipesPage.displayItemInDropdown(item, customSelect);

        // Displays option on select
        this.recipesPage.displayOptionInDropdown(item, select);
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
   * @see displayMatchingDataInDropdown
   */
  displayMatchingItemsOnSelectBoxes(matchingIngredients, matchingAppliances, matchingUstensils){

    this.displayMatchingDataInDropdown(
      matchingIngredients,
      this.$ingredientsCustomSelect,
      this.$ingredientsSelect);

    this.displayMatchingDataInDropdown(
      matchingAppliances,
      this.$appliancesCustomSelect,
      this.$appliancesSelect);

    this.displayMatchingDataInDropdown(
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
  displayMatchingDataInDropdown(matchingRecipesDataItem, customSelect, select) {

    // Cleans select boxes and keeps search input on custom select
    this.cleanCustomSelect(customSelect);
    select.innerHTML = '';

    //Displays new dropdown list
    this.matchingRecipesDataForDropdown(matchingRecipesDataItem)
      .forEach(item => {

        // Displays ingredients dropdown
        this.recipesPage.displayItemInDropdown(item, customSelect);

        // Displays ingredients option
        this.recipesPage.displayOptionInDropdown(item, select);
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

  cleanCustomSelect(customSelect) {
    const items = Array.from(customSelect.children).slice(1);

    items
      .forEach(item => customSelect.removeChild(item));
  }
}