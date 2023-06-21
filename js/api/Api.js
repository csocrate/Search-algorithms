/**
 * ------------------------------------------------------------
 * Les Petits Plats api/Api.js
 * ------------------------------------------------------------
 */

class Api {
  data = undefined;

  /**
   * Gets data from the URL
   * @param {string} url - URL to the path from json file
   */
  constructor(url) {
    this._url = url;
  }

  /**
   * Returns data from the URL
   * @returns {object} Promise
   */
  async get() {
    return fetch(this._url)
      .then(response => {
        // Throws an error if the request fails
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then(data => this.data = data)
  }
}