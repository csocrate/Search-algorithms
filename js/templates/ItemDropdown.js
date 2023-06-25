/**
 * ------------------------------------------------------------
 * Les Petits Plats templates/ItemDropdown.js
 * ------------------------------------------------------------
 */

 class ItemDropdown {
  /**
   * @param {Object} recipes - list of objects from .json file
   */
  constructor(recipes) {
    this._recipes = recipes;
  }

  get recipes() {
    return this._recipes;
  }

  /**
   * Create item for dropdown
   * With data
   * @param {string} data 
   * @param {HTMLElement} list
   */
   createItemForDropdown(data, list) {

    const li = document.createElement('li');

    if (data !== undefined) {

      li.innerHTML = `
        <li>
          <a class="dropdown-item" role="option">
          ${data}
          </a>
        </li>`;
    }

    list.appendChild(li);
  }
 }