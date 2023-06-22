/**
 * ------------------------------------------------------------
 * Les Petits Plats templates/ItemsDropdown.js
 * ------------------------------------------------------------
 */

 class ItemsDropdown {
  /**
   * @param {Object} recipes - list of objects from .json file
   */
  constructor(recipes) {
    this.$ingredientsList = document.querySelector('#ingredients_list');
    this.$appliancesList = document.querySelector('#appliances_list');
    this.$ustensilsList = document.querySelector('#ustensils_list');

    this._recipes = recipes;
  }

  get recipes() {
    return this._recipes;
  }

  /**
   * Returns ingredient dropdown template
   * @returns {HTMLElement} - 
   */
  createIngredientDropdown() {

    this._recipes.ingredients
      .map(ingredient => {

        const li = document.createElement('li');

        const a = document.createElement('a');
        a.classList.add('dropdown-item');
        a.setAttribute('role', 'option');
        a.textContent = ingredient.ingredient;

        li.append(a);

        this.$ingredientsList.appendChild(li);
      });
  }

  /**
   * Returns appliance dropdown template
   * @returns {HTMLElement} - 
   */
  createApplianceDropdown() {

    const li = document.createElement('li');

    const a = document.createElement('a');
    a.classList.add('dropdown-item');
    a.setAttribute('role', 'option');
    a.textContent = this._recipes.appliance;

    li.append(a);

    this.$appliancesList.appendChild(li);
  }

  /**
   * Returns ustensils dropdown template
   * @returns {HTMLElement} - 
   */
  createUstensilDropdown() {

    // this._recipes.ustensils
    //   .forEach(ingredient => {

        const li = document.createElement('li');

        // const a = document.createElement('a');
        // a.classList.add('dropdown-item');
        // a.setAttribute('role', 'option');
        // a.textContent = ingredient.ustensils;

        li.innerHTML = `
          <li>
            <a class="dropdown-item" role="option">
              ${this.getUstensilData()}
            </a>
          </li>`;

        this.$ustensilsList.appendChild(li);
  }

  /**
   * Returns text content of ustensil dropdown
   * @returns {string} - ustensil
   */
  getUstensilData() {
    const ustensils = this._recipes.ustensils;

    for (const ustensil of ustensils) {
      return ustensil;
    }
  }
 }