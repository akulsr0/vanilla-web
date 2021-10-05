// DOM Elements
// -- AlertBox Elements
const alertBox = document.querySelector(".alert");
const alertCross = alertBox.querySelector("span");
// -- Input Elements for Alert Customization
const alertTextInput = document.getElementById("alert-text");
const alertThemeSelect = document.getElementById("alert-theme");
const alertPositionSelect = document.getElementById("alert-position");
const alertTimeoutInput = document.getElementById("alert-timeout");
// -- `Show Alert` Button
const showAlertButton = document.getElementById("show-alert");

// Variables
let text = "This is an alert message.";
let alertOptions = {
  position: "center",
  theme: "lightgrey",
  time: 3000,
};
let alertTimeoutId;

// Event Listeners
// -- Listeners for Custom Alert Inputs
alertTextInput.addEventListener("change", (e) => {
  text = e.target.value;
});
alertThemeSelect.addEventListener("change", (e) => {
  alertOptions = { ...alertOptions, theme: e.target.value };
});
alertPositionSelect.addEventListener("change", (e) => {
  alertOptions = { ...alertOptions, position: e.target.value };
});
alertTimeoutInput.addEventListener("change", (e) => {
  alertOptions = { ...alertOptions, time: Number(e.target.value) * 1000 };
});
// -- Listener for Show/Hide alert
showAlertButton.addEventListener("click", () => showAlert(text, alertOptions));
alertCross.addEventListener("click", hideAlert);

/**
 * Hides an alert
 *
 * @function hideAlert
 */
function hideAlert() {
  alertBox.style.display = "none";
}

/**
 * Shows an alert
 *
 * @function showAlert
 * @typedef {{theme: string, position: string, time: number}} AlertOptions
 * @param {string} text
 * @param {AlertOptions} options
 */
function showAlert(text, options = {}) {
  const { theme = "lightgrey", position = "center", time = 3000 } = options;
  alertTimeoutId && clearTimeout(alertTimeoutId);
  alertTimeoutId = setTimeout(hideAlert, time);
  const alertTextNode = alertBox.querySelector("p");
  alertTextNode.innerText = text;
  alertBox.style.display = "flex";
  alertBox.style.backgroundColor = theme;
  const alertClass = position
    .trim()
    .split(" ")
    .map((p) => `alert-${p}`)
    .join(" ");
  alertBox.classList = `alert ${alertClass}`;
}
