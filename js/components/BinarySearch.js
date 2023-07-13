/**
 * ------------------------------------------------------------
 * Les Petits Plats components/BinarySearch.js
 * ------------------------------------------------------------
 */

class BinarySearch extends MainSearchBar {
  constructor() {
    super();
  }

  isUserValueMatches(subtring, array) {

    let result = [];

    this.isUserValueMatchesByRegex(subtring, array, result);

    return result;

  }

  isUserValueMatchesByRegex(substring, array, matchingArray) {
    // First and last index of array
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
      let middle = Math.floor((left + right) / 2);
      let middleElement = array[middle];
      const regExp = new RegExp(substring, 'gmi');

      if (middleElement.toLowerCase().match(regExp)) {
        
        matchingArray.push(middleElement);

        // Checks if other elements to the left of middle element match
        let i = middle - 1;
        while (i >= left && array[i].toLowerCase().match(regExp)) {
          matchingArray.push(array[i]);
          i--;
        }

        // Checks if other elements to the right of middle element match
        let j = middle + 1;
        while (j < right && array[j].toLowerCase().match(regExp)) {
          matchingArray.push(array[j]);
          j++;
        }

        return;

      } else if (middleElement.toLowerCase() < substring.toLowerCase()) {
        left = middle + 1;
      } else {
        right = middle - 1;
      }
    }
    // No substring matches
    return -1;
  }
}