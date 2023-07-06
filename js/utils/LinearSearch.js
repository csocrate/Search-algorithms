/**
 * ------------------------------------------------------------
 * Les Petits Plats utils/LinearSearch.js
 * ------------------------------------------------------------
 */

class LinearSearch extends MainSearchBar {
  constructor() {
    super();
  }

  searchIncludeValue(inputValue, recipesData) {

    let matches = false;

    let result = [];

    for (let i = 0; i < recipesData.length; i++) {
      //  if (cupcake[i].toLowerCase().charCodeAt() == input.charCodeAt()) {
      //    newArray.push(cupcake[i])
      //    matches = true;
      //  }

      if (recipesData[i].toLowerCase().includes(inputValue)) {
        result.push(recipesData[i]);
        matches = true;
      }
    }
    // console.log(result)
  }
}