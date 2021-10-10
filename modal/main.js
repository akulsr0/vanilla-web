// DOM Elements
const modalWrapper = document.getElementById("modal-wrapper");
const modal = document.getElementById("modal");
const showModalButton = document.getElementById("show-modal-btn");

// onClick Methods
modalWrapper.onclick = hideModal;
modal.onclick = onClickModal;
showModalButton.onclick = showModal;

/**
 * Shows Modal
 *
 * @function showModal
 */
function showModal() {
  modalWrapper.style.visibility = "visible";
}

/**
 * Hides Modal
 *
 * @function hideModal
 */
function hideModal() {
  modalWrapper.style.visibility = "hidden";
}

/**
 * Stops event bubbling.
 *
 * @function onClickModal
 * @param {Event} e
 */
function onClickModal(e) {
  e.stopPropagation();
}
