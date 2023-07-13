/**
 * ------------------------------------------------------------
 * Les Petits Plats components/LinearSearch.js
 * ------------------------------------------------------------
 */

 class LinearSearch extends MainSearchBar {
  constructor() {
    super();
  }

  /**
   * Returns an array of objects
   * Matching with user input value
   * By match() method
   * @param {string} userInputValue
   * @param {Object} recipesData
   * @returns {Array} isMatches
   */
  isUserValueMatchesByRegex(userInputValue, recipesData) {
    
    const isMatches =  recipesData.filter(el => {
  
      const regExp = new RegExp(userInputValue, 'gmi');

      return el.search.match(regExp);
    });

    return isMatches;
  }

  /**
   * Returns an array of user value matching
   * By include() method
   * @param {*} userInputValue 
   * @param {*} recipesData
   * @returns {Array} result
   */
  isUserValueMatchesByIncludes(userInputValue, recipesData) {
    
    const isMatches =  recipesData.filter(el => {

      return el.search.includes(userInputValue);
    });

    return isMatches;
  }
}