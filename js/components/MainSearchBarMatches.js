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
   * Returns matching data in a specific order
   * By slicing main array into chunks
   * @param {Event & {eventTargetValue: HTMLInputElement}} eventTargetValue
   * @param {Array} mainArray - Data array from API
   * @param {number} size - size of mainArray chunks
   * @returns matchingDataArray
   */
  isDataSearchMatches(eventTargetValue, mainArray, size) {

    let chunks = [];
    let isMatches = [];

    // List of chunks
    this.sliceMainArrayIntoChunks(mainArray, size, chunks);

    // Array of specific order
    const searchOrder = this.updateIndexesOrder(chunks);

    // Searchs matching data inside each current chunk in specific order
    for (let i = 0; i < chunks.length; i++) {
      isMatches.push(this.searchMatchingData(chunks, i, searchOrder, eventTargetValue));
    }

    return isMatches.flat();
  }

  /**
   * Returns chunks of mainArray
   * @param {Array} mainArray - Data array from API
   * @param {number} size - size of mainArray chunks
   * @param {Array} chunks Chunks of mainArray
   * @returns chunks
   */
  sliceMainArrayIntoChunks(mainArray, size, chunks) {

    for (let i = 0; i < mainArray.length; i += size) {
      const chunk = mainArray.slice(i, i + size);
      chunks.push(chunk);
    }

    return chunks;
  }

  /**
   * Returns a specific search order
   * Based on chunks length
   * @param {Array} chunks Chunks of mainArray
   * @returns {Array | number} searchOrder
   */
  updateIndexesOrder(chunks) {

    let searchOrder = [];

    for (let i = 0; i < chunks.length; i++) {

      const indexes = chunks.indexOf(chunks[i]);

      searchOrder.push(indexes)
    }

    searchOrder = this.moveSearchOrderIndex(searchOrder);

    return searchOrder;
  }

  /**
   * Returns a specific search order
   * @param {Array} array
   * @returns {Array | number} result
   */
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

  /**
   * Returns matching data inside current chunk
   * @param {Array} array Chunks of main array
   * @param {number} index Index of order
   * @returns {Array | number} order  
   * @param {Event & {eventTargetValue: HTMLInputElement}} eventTargetValue
   * @returns isMatches
   */
  searchMatchingData(array, index, order, eventTargetValue) {

    let isMatches;

    const indexArray = order[index];

    const currentChunk = array[indexArray];

    isMatches = this.isChunkMatches(eventTargetValue, currentChunk);

    return isMatches;
  }

  /**
   * Returns matching data of a main array chunk
   * @param {string} expression
   * @param {Array} array Current chunk
   * @returns result
   */
  isChunkMatches(expression, array) {

    const result = array.filter(el => {

      const regExp = new RegExp(expression, 'gmi');

      return el.search.match(regExp);
    });

    return result;
  }
}