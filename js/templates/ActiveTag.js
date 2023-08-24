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
      'rounded',
      'col-10',
      'col-md-4',
      'col-lg-2',
      'py-3',
      'bg-primary');

    li.innerHTML = `
        ${item}
        <button 
          type="button" 
          class="btn-close" 
          aria-label="Supprimer cet ingrédient">
        </button>`;

    return li;
  }
}