/**
 * ------------------------------------------------------------
 * Les Petits Plats templates/ActiveTag.js
 * ------------------------------------------------------------
 */

class ActiveTag {
  /**
   * Creates li tag with close button
   * @param {string} item 
   * @returns HTMLElement - li
   */
  createActivetag(item) {

    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'flex-wrap',
      'align-items-center',
      'fs-8',
      'rounded',
      'col-sm-6',
      'col-md-5',
      'col-lg-3',
      'col-xl',
      'col-xxl-3',
      'py-3',
      'bg-primary');

    li.innerHTML = `
        ${item}
        <button 
          type="button" 
          class="btn-close fs-0" 
          aria-label="Supprimer cet ingrédient">
        </button>`;

    return li;
  }
}