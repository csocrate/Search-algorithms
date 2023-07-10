/**
 * ------------------------------------------------------------
 * Les Petits Plats utils/LinearSearch.js
 * ------------------------------------------------------------
 */

class LinearSearch extends MainSearchBar {
  constructor() {
    super();
  }  

  /**
   * Returns an array of user value matching
   * By match() method
   * @param {*} userInputValue
   * @param {*} recipesData
   * @returns {Array} result
   */
  isUserValueMatchesByRegex(userInputValue, recipesData) {
    
    let result = [];

    const regExp = new RegExp(userInputValue, 'gmi');

    for (let i = 0; i < recipesData.length; i++) {

      const matches = recipesData[i].match(regExp);
      if (matches) {
        result.push(recipesData[i]);
      }
    }
    return result;
  }

  /**
   * Returns an array of user value matching
   * By include() method
   * @param {*} userInputValue 
   * @param {*} recipesData
   * @returns {Array} result
   */
  isUserValueMatchesByIncludes(userInputValue, recipesData) {

    let matches;

    let result = [];

    for (let i = 0; i < recipesData.length; i++) {

      if (!recipesData[i].toLowerCase().includes(userInputValue)) {
        matches = false;
      } else {
        matches = true;
      }

      if (matches) {
        result.push(recipesData[i]);
      }
    }
    return result;
  }
}