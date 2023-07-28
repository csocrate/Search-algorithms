/**
 * ------------------------------------------------------------
 * Les Petits Plats components/MainSearchBarMatches.js
 * ------------------------------------------------------------
 */

 class MainSearchBarMatches extends MainSearchBar {
  constructor() {
    super();
  }

  /**
   * Returns an array of objects
   * Matching with event target value
   * By includes() method
   * @param {Event & {eventTargetValue: HTMLInputElement}} eventTargetValue
   * @param {Object} mainArray Main data from API
   * @returns {Array} result - Result of matching data
   */
   isDataSearchMatches(eventTargetValue, mainArray) {
    
    const result =  mainArray.filter(el => {

      const data = el.search.toLowerCase();
      const inputValue= eventTargetValue.toLowerCase();

      return data.includes(inputValue);
    });

    return result;
  }
}