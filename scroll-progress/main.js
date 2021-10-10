// DOM Elements
const content = document.getElementById("content");
const progressBar = document.querySelector(".progress-bar");

// Event Listener
content.addEventListener("scroll", onContentScroll);

/**
 * Gets scrolled percentage and changes progress bar width.
 *
 * @function onContentScroll
 */
function onContentScroll() {
  const scrollPercent =
    (100 * content.scrollTop) / (content.scrollHeight - content.clientHeight);
  progressBar.style.width = `${scrollPercent}%`;
}
