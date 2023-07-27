/**
 * ------------------------------------------------------------
 * Les Petits Plats components/V2.js
 * ------------------------------------------------------------
 */

class V2 extends MainSearchBar {
  constructor() {
    super();
  }

  /**
   * Slices main array into chunks
   * Returns matching data of all trunks
   * @param {Event & {eventTargetValue: HTMLInputElement}} eventTargetValue
   * @param {Array} mainArray - Data array from API
   * @param {number} size - size of mainArray trunks
   * @returns matchingDataArray
   */
  isUserValueMatchesByV2(eventTargetValue, mainArray, size) {

    let chunks = [];

    this.sliceMainArrayIntoChunks(mainArray, size, chunks);

    const searchOrder = this.updateIndexesOrder(chunks);

    // console.log(chunks)
    // console.log(searchOrder)

    let isMatches = [];

    isMatches.push(
      this.searchMatchingData(chunks, 0, searchOrder, eventTargetValue),
      this.searchMatchingData(chunks, 1, searchOrder, eventTargetValue),
      this.searchMatchingData(chunks, 2, searchOrder, eventTargetValue),
      this.searchMatchingData(chunks, 3, searchOrder, eventTargetValue),
      this.searchMatchingData(chunks, 4, searchOrder, eventTargetValue));

    return isMatches.flat();
  }

  searchMatchingData(array, index, order, eventTargetValue) {
    let isMatches;

    const indexArray = order[index];

    const currentArray = array[indexArray];

    isMatches = this.isChunkMatches(eventTargetValue, currentArray);

    return isMatches;
  }

  isChunkMatches(expression, array) {

    const result = array.filter(el => {

      const regExp = new RegExp(expression, 'gmi');

      return el.search.match(regExp);
    });

    return result;
  }

  sliceMainArrayIntoChunks(mainArray, size, chunks) {

    for (let i = 0; i < mainArray.length; i += size) {
      const chunk = mainArray.slice(i, i + size);
      chunks.push(chunk);
    }

    return chunks;
  }

  updateIndexesOrder(chunks) {

    let searchOrder = [];

    for (let i = 0; i < chunks.length; i++) {

      const indexes = chunks.indexOf(chunks[i]);

      searchOrder.push(indexes)
    }

    searchOrder = this.moveSearchOrderIndex(searchOrder);

    return searchOrder;
  }

  moveSearchOrderIndex(array) {
    let result = [];
    const middle = Math.floor(array.length / 2);

    for (let i = 0; i < middle; i++) {
      result.push(
        array[i],
        array[array.length - 1 - i]);
    }

    if (array.length % 2 !== 0) {
      result.push(array[middle]);
    }

    return result;
  }
}