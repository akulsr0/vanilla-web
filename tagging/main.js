// DOM Elements
const box = document.getElementById("box");
const tagInputWrapper = document.getElementById("box-input");
const tagInput = tagInputWrapper.querySelector("input");

// Variables
let tagPoint = [null, null];

// Event Listeners
box.addEventListener("click", onClickBox);
tagInputWrapper.addEventListener("click", onClickTagInputWrapper);
tagInput.addEventListener("click", onClickTagInput);
tagInput.addEventListener("keypress", onInputKeyPress);
window.addEventListener("click", onClickElsewhere);

/**
 * Hide tag input if clicked somewhere else
 *
 * @function onClickElsewhere
 * @param {Event} e
 */
function onClickElsewhere(e) {
  if (!box.contains(e.target)) {
    setShowTagInput(false);
  }
}

/**
 * Shows tag input where its been clicked.
 *
 * @function onClickBox
 * @param {Event} e
 */
function onClickBox(e) {
  const { offsetX, offsetY } = e;
  setShowTagInput();
  tagInput.focus();
  tagInputWrapper.style.top = `${offsetY}px`;
  tagInputWrapper.style.left =
    offsetX < 40 ? `${offsetX}px` : `${offsetX - 40}px`;
  tagPoint = [offsetX, offsetY];
}

/**
 * When input is clicked, box is also clicked, so here we stop its propagation.
 *
 * @function onClickTagInputWrapper
 * @param {Event} e
 */
function onClickTagInputWrapper(e) {
  e.stopPropagation();
}

/**
 * When input is clicked, box is also clicked, so here we stop its propagation.
 *
 * @function onClickTagInput
 * @param {Event} e
 */
function onClickTagInput(e) {
  e.stopPropagation();
}

/**
 * Saves tag when enter is pressed
 *
 * @function onInputKeyPress
 * @param {Event} e
 */
function onInputKeyPress(e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    onClickSave();
  }
}

/**
 * Saves the tag
 *
 * @function onClickSave
 */
function onClickSave() {
  const tagValue = tagInput.value;
  if (tagValue !== "") {
    tagInput.value = "";
    const [_x, _y] = tagPoint;
    const tagElement = document.createElement("span");
    tagElement.innerHTML = tagValue;
    tagElement.className = "tag";
    tagElement.style.top = `${_y}px`;
    tagElement.style.left = `${_x}px`;
    box.appendChild(tagElement);
  }
  setShowTagInput(false);
}

/**
 * Shows/hides tag input
 *
 * @function setShowTagInput
 * @param {Boolean} showTagInput
 */
function setShowTagInput(showTagInput = true) {
  tagInputWrapper.style.display = showTagInput ? `flex` : "none";
}
