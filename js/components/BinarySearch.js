/**
 * ------------------------------------------------------------
 * Les Petits Plats components/BinarySearch.js
 * ------------------------------------------------------------
 */

class BinarySearch extends MainSearchBar {
  constructor() {
    super();
  }

  /**
   * 
   * @param {string} subtring - User input value
   * @param {Array} array - Array of data Api
   * @param {number} left - First index of array
   * @param {number} right - Last index of array
   * @returns {Array | Objects} - isMatching
   */
  isUserValueMatches(subtring, array, left, right) {

    let isMatching = [];

    this.isUserValueMatchesByRegex(subtring, array, isMatching, left, right);

    console.log(isMatching)

    return isMatching;
  }

  /**
   * 
   * Uses binary search method to find matching user input value
   * from data Api
   * @param {string} subtring - User input value
   * @param {Array} array - Array of data Api
   * @param {Array} matchingArray
   * @param {number} left - Fist index of array
   * @param {number} right - Last index of array
   * @returns {number} -1 - No substring matches
   */
  isUserValueMatchesByRegex(substring, array, matchingArray, left, right) {

    array
      .sort((a, b) => a.search.localeCompare(b.search)) // Sorts for binary search
      console.log(array)

    while (left <= right) {
      let middle = Math.floor((left + right) / 2);
      let middleElement = array[middle];

      const regExp = new RegExp(substring, 'gmi');

      // Using search property of array
      if (middleElement.search.match(regExp)) {

        matchingArray.push(middleElement);

        for (let i = middle - 1; i >= left; i--) {

          if (array[i].search.match(regExp)) {
            matchingArray.push(array[i]);
          }
        }

        for (let j = middle + 1; j <= right; j++) {
          
          if (array[j].search.match(regExp)) {
            matchingArray.push(array[j]);
          }
        }

        return;

      } else if (middleElement.search.toLowerCase() < substring.toLowerCase()) {

        this.isUserValueMatchesByRegex(substring, array, matchingArray, middle + 1, right);
      } else {

        this.isUserValueMatchesByRegex(substring, array, matchingArray, left, middle - 1);
      }
      return;
    }
    return -1;
  }
}