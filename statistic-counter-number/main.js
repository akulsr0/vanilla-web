// DOM Elements
const statisticNumber = document.getElementById("number");
const numberInput = document.getElementById("number-input");
const startButton = document.getElementById("start-button");

// Variables
let interval;

/**
 * Initialize the app
 *
 * @function init
 */
(function init() {
  startAnimation(numberInput.value);
})();

// Event Listener
startButton.addEventListener("click", () => startAnimation(numberInput.value));

/**
 * Starts the animation
 *
 * @function startAnimation
 * @param {Number} end - Final Number
 */
function startAnimation(end) {
  const start = end > 500 ? end - 500 : 0;
  statisticNumber.innerText = start;
  interval = setInterval(increaseStatisticNumber, 30);
}

/**
 * Increases Statistic Number
 *
 * @function increaseStatisticNumber
 */
function increaseStatisticNumber() {
  const num = +statisticNumber.innerText;
  const end = +numberInput.value;
  if (num >= end) {
    clearInterval(interval);
  } else {
    const inc = end - num > 10 ? 10 : end - num;
    statisticNumber.innerText = num + inc;
  }
}
