/**
 * ------------------------------------------------------------
 * Les Petits Plats components/DropdownList.js
 * ------------------------------------------------------------
 */

class DropdownList {

  constructor() {
    this.recipesPage = new RecipesPage();
    this.advancedFilterSearchBar = new AdvancedFilterSearchBar();

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
   * 
   * @param {Array} recipesData 
   * @param {Event & {eventTargetValue: HTMLInputElement}} eventTargetValue
   * @see matchingDataOnDropdownMatchesEventTargetValue
   * @see displayMatchingDataOnAdvancedFilter
   */
  updateDropdownDataByAdvancedFilterSearchBar(recipesData, eventTargetValue) {

    let ingredients;
    let appliances;
    let ustensils;

    if (recipesData.length == 3) {

      ingredients = this.matchingDataOnDropdownMatchesEventTargetValue(
        recipesData[0],
        undefined,
        undefined,
        eventTargetValue);

      appliances = this.matchingDataOnDropdownMatchesEventTargetValue(
        recipesData[1],
        undefined,
        undefined,
        eventTargetValue);

      ustensils = this.matchingDataOnDropdownMatchesEventTargetValue(
        recipesData[2],
        undefined,
        undefined,
        eventTargetValue);

    } else {

      ingredients = this.matchingDataOnDropdownMatchesEventTargetValue(
        recipesData,
        'ingredients',
        'ingredient',
        eventTargetValue);

      appliances = this.matchingDataOnDropdownMatchesEventTargetValue(
        recipesData,
        'appliance',
        undefined,
        eventTargetValue);

      ustensils = this.matchingDataOnDropdownMatchesEventTargetValue(
        recipesData,
        'ustensils',
        undefined,
        eventTargetValue);
    }

    this.displayMatchingDataOnAdvancedFilter(ingredients, appliances, ustensils);
  }

  /**
   * Display matching data on dropdown of advanced search filter
   * when this one is the active element on document
   * @see displayMatchingDataInDropdown
   */
  displayMatchingDataOnAdvancedFilter(ingredients, appliances, ustensils) {

    if (document.activeElement === document.querySelector('#search_ingredient')) {

      this.displayMatchingDataInDropdown(
        ingredients,
        this.$ingredientsCustomSelect,
        this.$ingredientsSelect);
    }

    if (document.activeElement === document.querySelector('#search_appliance')) {

      this.displayMatchingDataInDropdown(
        appliances,
        this.$appliancesCustomSelect,
        this.$appliancesSelect);
    }

    if (document.activeElement === document.querySelector('#search_ustensil')) {

      this.displayMatchingDataInDropdown(
        ustensils,
        this.$ustensilsCustomSelect,
        this.$ustensilsSelect);
    }
  }

  /**
   * Returns list of matching data from Api
   * @param {Array} recipesData 
   * @param {string} key 
   * @param {string} value
   * @param {Event & {eventTargetValue: HTMLInputElement}} eventTargetValue 
   * @returns  matchingData
   */
  matchingDataOnDropdownMatchesEventTargetValue(recipesData, key, value, eventTargetValue) {

    const matchingData = this.isUserValueMatches(
      eventTargetValue,
      this.getData(recipesData, key, value));

    return matchingData;
  }

  /**
   * Returns ingredients, appliance or ustensils data from Api
   * @param {Array} recipesData 
   * @returns data - ingredients, appliance or ustensils
   * @see recipesDataForDropdown
   */
  getData(recipesData, key, value) {
    const data = this.recipesDataForDropdown(
      recipesData,
      key,
      value);

    return data;
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

    let data;

    if (!key && !value) {
      return recipesData
        .reduce((acc, el) => { // avoids duplicated item

          let data;

          data = el.charAt(0).toUpperCase() + el.toLowerCase().slice(1);

          if (acc.indexOf(data) < 0) {
            acc.push(data);
          }
          return acc;
        }, []);
    }
    else {

      return recipesData
        .map(recipe => recipe[`${key}`])
        .flat()
        .reduce((acc, el) => { // avoids duplicated item

          if (value) {
            data = el[`${value}`].charAt(0).toUpperCase() + el[`${value}`].toLowerCase().slice(1);

          } else {
            data = el.charAt(0).toUpperCase() + el.slice(1);
          }

          if (acc.indexOf(data) < 0) {
            acc.push(data);
          }
          return acc;
        }, []);
    }
  }

  /**
   * Displays available matches on dropdown list from main search bar
   * @param {Array} matchingIngredients 
   * @param {Array} matchingAppliances 
   * @param {Array} matchingUstensils
   * @see displayMatchingDataInDropdown
   */
  displayAvailableMatchesOnDropdown(matchingIngredients, matchingAppliances, matchingUstensils) {

    if (matchingIngredients) {

      this.displayMatchingDataInDropdown(
        matchingIngredients,
        this.$ingredientsCustomSelect,
        this.$ingredientsSelect);
    }

    if (matchingAppliances) {

      this.displayMatchingDataInDropdown(
        matchingAppliances,
        this.$appliancesCustomSelect,
        this.$appliancesSelect);
    }

    if (matchingUstensils) {

      this.displayMatchingDataInDropdown(
        matchingUstensils,
        this.$ustensilsCustomSelect,
        this.$ustensilsSelect);
    }
  }

  /**
   * Displays matching data in dropdown list
   * @param {Array} matchingRecipesDataItem
   * @param {HTMLElement} customSelect
   * @param {HTMLElement} select
   * @see matchingRecipesDataForDropdown
   */
  displayMatchingDataInDropdown(matchingRecipesDataItem, customSelect, select) {

    this.advancedFilterSearchBar.cleanSelectBoxes(customSelect, select);

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
   * Returns an array of data
   * Matching with user input value
   * By match() method
   * @param {string} userInputValue
   * @param {Object} dataDropdown
   * @returns {Array} isMatches
   */
  isUserValueMatches(userInputValue, dataDropdown) {

    const isMatches = dataDropdown.filter(data => {

      const punctuation = /[\.,?!]/g;
      const accents = /[\u0300-\u036f]/g;

      data = data
        .replace(punctuation, ' ')
        .normalize('NFD')
        .replace(accents, '')
        .toLowerCase();

      const regExp = new RegExp(userInputValue, 'gmi');

      return data.match(regExp);
    });

    return isMatches;
  }
}