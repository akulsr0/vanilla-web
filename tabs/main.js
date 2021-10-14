// DOM Elements
const tabsContainer = document.getElementById("tabs");
const tabContent = document.getElementById("tab-content");

/**
 * Custom Tabs Data
 */
const tabsData = [
  {
    title: "HTML",
    content:
      '<div><img src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" alt="html" height="120px" /><p> The HyperText Markup Language, or HTML is the standard markup language for documents designed to be displayed in a web browser.</p></div>',
  },
  {
    title: "CSS",
    content:
      '<div><img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" alt="css" height="120px" /><p> Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language such as HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.</p></div>',
  },
  {
    title: "JS",
    content:
      '<div><img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg" alt="js" height="120px" /><p> JavaScript, often abbreviated as JS, is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.</p></div>',
  },
];

/**
 * Initialize the app
 *
 * @function init
 */
(function init() {
  setTab(0, true);
})();

/**
 * Adds `click` event listener for tabs
 *
 * @function registerTabClickListener
 */
function registerTabClickListener() {
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((t) => t.addEventListener("click", onClickTab));
}

/**
 * Sets a tab, when a tab is clicked.
 *
 * @function onClickTab
 * @param {Event} event TabClick Event
 */
function onClickTab(event) {
  const tab = event.target;
  const tabIndex = Array.from(tab.parentNode.children).indexOf(tab);
  setTab(tabIndex);
}

/**
 * Sets a tab
 *
 * @function setTab
 * @param {number} tabIndex Active Tab Index
 * @param {boolean} isInit If true, loads images (or data) from network
 * Note: isInit is helpful in reducing multiple network calls (for assets).
 */
function setTab(tabIndex = 0, isInit) {
  setTabContainer(tabIndex);
  if (isInit) {
    tabContent.innerHTML = tabsData.map((tabData) => tabData.content).join("");
  }
  setTabContent(tabIndex);
  registerTabClickListener();
}

/**
 * Sets Tab content
 *
 * @function setTabContent
 * @param {number} tabIndex Active Tab Index
 */
function setTabContent(tabIndex = 0) {
  tabContent.childNodes.forEach((tab, index) => {
    if (index !== tabIndex) {
      return (tab.style.display = "none");
    }
    tab.style.display = "flex";
  });
}

/**
 * Sets Tab bar
 *
 * @function setTabContainer
 * @param {number} tabIndex Active Tab Index
 */
function setTabContainer(tabIndex = 0) {
  tabIndex = tabIndex > tabsData.length - 1 ? 0 : tabIndex;

  const tabshtml = tabsData
    .map((tab, i) => getTabMarkup(tab.title, i === tabIndex))
    .join("");

  tabsContainer.innerHTML = tabshtml;
}

/**
 * Gives Tab markup string
 *
 * @function getTabMarkup
 * @param {string} title Tab Title
 * @param {boolean} isActive Tab State: true, if tab is active
 * @returns {string} Tab Markup
 */
function getTabMarkup(title, isActive) {
  if (isActive) {
    return `<div class='tab tab-active'>${title}</div>`;
  }
  return `<div class='tab'>${title}</div>`;
}
