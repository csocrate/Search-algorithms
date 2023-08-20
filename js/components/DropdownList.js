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
  displayDataOnDropdownLists(recipesData) {

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
   * @see displayItemInDropdown
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
   * Displays available matches on dropdown list from search filters
   * @param {Array} recipesData 
   * @param {Event & {eventTargetValue: HTMLInputElement}} eventTargetValue
   * @see ingredientsOnDropdownMatchesEventTargetValue
   * @see appliancesOnDropdownMatchesEventTargetValue
   * @see ustensilsOnDropdownMatchesEventTargetValue
   * @see displayMatchingIngredientsOnDropdownList
   * @see displayMatchingAppliancesOnDropdownList
   * @see displayMatchingUstensilsOnDropdownList
   */
  updateDropdownDataByAdvancedFilterSearchBar(recipesData, eventTargetValue) {

    const ingredients = this.ingredientsOnDropdownMatchesEventTargetValue(
      recipesData,
      eventTargetValue);

    const appliances = this.appliancesOnDropdownMatchesEventTargetValue(
      recipesData,
      eventTargetValue);

    const ustensils = this.ustensilsOnDropdownMatchesEventTargetValue(
      recipesData,
      eventTargetValue);

    if (document.activeElement === document.querySelector("#search_ingredient")) {

      this.displayMatchingIngredientsOnDropdownList(ingredients);
    }

    if (document.activeElement === document.querySelector('#search_appliance')) {

      this.displayMatchingAppliancesOnDropdownList(appliances);
    }

    if (document.activeElement === document.querySelector('#search_ustensil')) {

      this.displayMatchingUstensilsOnDropdownList(ustensils);
    }
  }
  updateDropdownDataByAdvancedFilterSearchBarBis(matchingIngredients, matchingAppliances, matchingUstensils, eventTargetValue) {

    const ingredients = this.ingredientsOnDropdownMatchesEventTargetValueBis(
      matchingIngredients,
      eventTargetValue);

    const appliances = this.appliancesOnDropdownMatchesEventTargetValueBis(
      matchingAppliances,
      eventTargetValue);

    const ustensils = this.ustensilsOnDropdownMatchesEventTargetValueBis(
      matchingUstensils,
      eventTargetValue);

    if (document.activeElement === document.querySelector("#search_ingredient")) {

      this.displayMatchingIngredientsOnDropdownList(ingredients);
    }

    if (document.activeElement === document.querySelector('#search_appliance')) {

      this.displayMatchingAppliancesOnDropdownList(appliances);
    }

    if (document.activeElement === document.querySelector('#search_ustensil')) {

      this.displayMatchingUstensilsOnDropdownList(ustensils);
    }
  }

  /**
   * Returns list of matching ingredients from Api
   * @param {Array} recipesData 
   * @param {Event & {eventTargetValue: HTMLInputElement}} eventTargetValue 
   * @returns {Array} matchingIngredients
   * @see isUserValueMatches
   * @see getIngredientsData
   */
  ingredientsOnDropdownMatchesEventTargetValue(recipesData, eventTargetValue) {

    const matchingIngredients = this.isUserValueMatches(
      eventTargetValue,
      this.getIngredientsData(recipesData));

    return matchingIngredients;
  }
  ingredientsOnDropdownMatchesEventTargetValueBis(recipesData, eventTargetValue) {

    const matchingIngredients = this.isUserValueMatches(
      eventTargetValue,
      this.getIngredientsDataBis(recipesData));

    return matchingIngredients;
  }

  /**
   * Returns list of matching appliances from Api
   * @param {Array} recipesData 
   * @param {Event & {eventTargetValue: HTMLInputElement}} eventTargetValue 
   * @returns {Array} matchingAppliances
   * @see isUserValueMatches
   * @see getIngredientsData
   */
  appliancesOnDropdownMatchesEventTargetValue(recipesData, eventTargetValue) {

    const matchingAppliances = this.isUserValueMatches(
      eventTargetValue,
      this.getAppliancesData(recipesData));

    return matchingAppliances;
  }
  appliancesOnDropdownMatchesEventTargetValueBis(recipesData, eventTargetValue) {

    const matchingAppliances = this.isUserValueMatches(
      eventTargetValue,
      this.getAppliancesDataBis(recipesData));

    return matchingAppliances;
  }

  /**
   * Returns list of matching ustensils from Api
   * @param {Array} recipesData 
   * @param {Event & {eventTargetValue: HTMLInputElement}} eventTargetValue 
   * @returns {Array} matchingUstensils
   * @see isUserValueMatches
   * @see getIngredientsData
   */
  ustensilsOnDropdownMatchesEventTargetValue(recipesData, eventTargetValue) {
    const matchingUstensils = this.isUserValueMatches(
      eventTargetValue,
      this.getUstensilssData(recipesData));

    return matchingUstensils;
  }
  ustensilsOnDropdownMatchesEventTargetValueBis(recipesData, eventTargetValue) {
    const matchingUstensils = this.isUserValueMatches(
      eventTargetValue,
      this.getUstensilssDataBis(recipesData));

    return matchingUstensils;
  }

  /**
   * Returns ingredients data from Api
   * @param {Array} recipesData 
   * @returns ingredientsData
   * @see recipesDataForDropdown
   */
  getIngredientsData(recipesData) {
    const ingredientsData = this.recipesDataForDropdown(
      recipesData,
      'ingredients',
      'ingredient');

    return ingredientsData;
  }
  getIngredientsDataBis(recipesData) {
    const ingredientsData = this.recipesDataForDropdownBis(
      recipesData);

    return ingredientsData;
  }

  /**
   * Returns appliances data from Api
   * @param {Array} recipesData 
   * @returns appliancesData
   * @see recipesDataForDropdown
   */
  getAppliancesData(recipesData) {
    const appliancesData = this.recipesDataForDropdown(
      recipesData,
      'appliance',
      undefined);

    return appliancesData;
  }
  getAppliancesDataBis(recipesData) {
    const appliancesData = this.recipesDataForDropdownBis(
      recipesData);

    return appliancesData;
  }

  /**
   * Returns ustensils data from Api
   * @param {Array} recipesData 
   * @returns ustensilsData
   * @see recipesDataForDropdown
   */
  getUstensilssData(recipesData) {
    const ustensilsData = this.recipesDataForDropdown(
      recipesData,
      'ustensils',
      undefined);

    return ustensilsData;
  }
  getUstensilssDataBis(recipesData) {
    const ustensilsData = this.recipesDataForDropdownBis(
      recipesData);

    return ustensilsData;
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
  recipesDataForDropdownBis(recipesData) {
    return recipesData
      .reduce((acc, el) => { // avoids duplicated item

        let data;

        data = el.charAt(0).toUpperCase() + el.slice(1);

        if (acc.indexOf(data) < 0) {
          acc.push(data);
        }
        return acc;

      }, []);
  }

  /**
   * @see displayMatchingDataInDropdown
   */

  /**
   * Displays available matches on dropdown list from main search bar
   * @param {Array} matchingIngredients 
   * @param {Array} matchingAppliances 
   * @param {Array} matchingUstensils
   * @see displayMatchingIngredientsOnDropdownList
   * @see displayMatchingAppliancesOnDropdownList
   * @see displayMatchingUstensilsOnDropdownList
   */
  displayAvailableMatchesOnDropdownByMainSearchBar(matchingIngredients, matchingAppliances, matchingUstensils) {

    if (matchingIngredients) {
      this.displayMatchingIngredientsOnDropdownList(matchingIngredients);
    }

    if (matchingAppliances) {
      this.displayMatchingAppliancesOnDropdownList(matchingAppliances);
    }

    if (matchingUstensils) {
      this.displayMatchingUstensilsOnDropdownList(matchingUstensils);
    }
  }

  /**
   * 
   * @param {Array} matchingIngredients
   * @see displayMatchingDataInDropdown
   */
  displayMatchingIngredientsOnDropdownList(matchingIngredients) {

    this.displayMatchingDataInDropdown(
      matchingIngredients,
      this.$ingredientsCustomSelect,
      this.$ingredientsSelect);
  }

  /**
   * 
   * @param {Array} matchingAppliances
   * @see displayMatchingDataInDropdown
   */
  displayMatchingAppliancesOnDropdownList(matchingAppliances) {

    this.displayMatchingDataInDropdown(
      matchingAppliances,
      this.$appliancesCustomSelect,
      this.$appliancesSelect);
  }

  /**
   * 
   * @param {Array} matchingUstensils
   * @see displayMatchingDataInDropdown 
   */
  displayMatchingUstensilsOnDropdownList(matchingUstensils) {

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

    this.cleanSelectBoxes(customSelect, select);

    //Displays new dropdown list
    this.matchingRecipesDataForDropdown(matchingRecipesDataItem)
      .forEach(item => {

        // Displays item dropdown
        this.recipesPage.displayItemInDropdown(item, customSelect);

        // Displays option
        this.recipesPage.displayOptionInDropdown(item, select);

        const customSelectAttribute = {
          'class': 'd-none'
        }

        const selectAttributes = {
          'class': 'd-none',
          'selected': ''
        };

        // Hides selected item in custom select
        this.hideSelectedElementInDropdown(customSelect, customSelectAttribute);

        // Hides selected option in select
        this.hideSelectedElementInDropdown(select, selectAttributes);
      });
  }

  /**
   * Hides selected element in dropdown
   */
  hideSelectedElementInDropdown(container, attributes) {

    const tags = Array.from(document.querySelectorAll('#filter_tags li'));

    tags
      .forEach(tag => {

        const options = Array.from(container.children)

        options
          .forEach(option => {

            if (option.textContent.trim() === tag.textContent.trim()) {

              // To keep only the rest of options
              this.setAttributesToSelectedElement(option, attributes)
            }
          });
      });
  }

  /**
   * Sets mulitple attributes to an element
   * @param {HTMLElement} element 
   * @param {Object | string} attributes 
   */
  setAttributesToSelectedElement(element, attributes) {
    for (let key in attributes) {
      element.setAttribute(key, attributes[key])
    }
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

  /**
   * Cleans select boxes and keeps search input on custom select
   * @see cleanCustomSelect
   */
  cleanSelectBoxes(customSelect, select) {
    this.cleanCustomSelect(customSelect);
    select.innerHTML = '';
  }

  /**
   * 
   * @param {HTMLElement} customSelect 
   */
  cleanCustomSelect(customSelect) {
    const items = Array.from(customSelect.children).slice(1);

    items
      .forEach(item => customSelect.removeChild(item));
  }

  /**
   * Returns an array of data
   * Matching with user input value
   * By match() method
   * @param {string} userInputValue
   * @param {Object} dataDropdown
   * @returns {Array} isMatches
   */
  isUserValueMatches(userInputValue, dataDropdown) {

    const isMatches = dataDropdown.filter(data => {

      const regExp = new RegExp(userInputValue, 'gmi');

      return data.match(regExp);
    });

    return isMatches;
  }
}