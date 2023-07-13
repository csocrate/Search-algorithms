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

    let isMatching = [];

    this.isUserValueMatchesByRegex(subtring, array, isMatching);

    console.log(isMatching)

    return isMatching;
  }

  isUserValueMatchesByRegex(substring, array, matchingArray) {
    // First and last index of array
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
      let middle = Math.floor((left + right) / 2);
      let middleElement = array[middle];

      const regExp = new RegExp(substring, 'gmi');

      // Using search property of array
      if (middleElement.search.match(regExp)) {
        
        matchingArray.push(middleElement);

        for (let i = middle - 1; i >= left ; i--) {

          if (array[i].search.match(regExp)) {
            matchingArray.push(array[i]);
          }
        }

        for (let j = middle + 1; j < right ; j++) {

          if (array[j].search.match(regExp)) {
            matchingArray.push(array[j]);
          }
        }

        return;

      } else if (middleElement.search < substring) {
        left = middle + 1;
        console.log('First index on right: ' + left)
      } else {
        right = middle - 1;
        console.log('Last index on left: ' + right)
      }
    }
    // No substring matches
    return -1;
  }
}