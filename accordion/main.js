// DOM Elements
const accordionWrapper = document.getElementById("accordion-wrapper");
let accordionTabs; // Accordion Tabs Array

/**
 * @typedef {{_id: number, title: string, content: string}} Tab
 */
const tabs = [
  {
    _id: 1,
    title: "Tab 1",
    content: "Tab 1 content",
  },
  {
    _id: 2,
    title: "Tab 2",
    content: "Tab 2 content.<p>This can be markup also</p>",
  },
  {
    _id: 3,
    title: "Tab 3",
    content: "Tab 3 content",
  },
  {
    _id: 4,
    title: "Tab 4",
    content:
      "Tab 4 content <br> <br> <img src='https://picsum.photos/320/160' alt='' >",
  },
];

/**
 * Initialize the app
 * Adds tabs to the Accordion
 *
 * @function init
 */
(function init() {
  tabs.forEach(function addTabsInAccordion(tab) {
    accordionWrapper.appendChild(getAccordionTab(tab));
  });

  accordionTabs = document.querySelectorAll(".accordion-tab");
})();

// Event Listeners for Accordion Tabs
accordionTabs.forEach(function addTabClickListener(accordionTab) {
  accordionTab.addEventListener("click", onClickAccordionTab);
});

/* ****************************************************************** */

/**
 * Opens/Closes Accordion tab
 *
 * @function onClickAccordionTab
 * @param {Event} e
 */
function onClickAccordionTab(e) {
  // id of clicked tab
  const id = e.target.parentNode.id;

  // Iterating over accordion tabs i.e. accordionTabs
  accordionTabs.forEach((tab) => {
    // tabSection is the accordion content area
    const tabSection = tab.querySelector("section");
    // isTabUnselected - If tab is not open already
    const isTabUnselected =
      tabSection.style.display === "none" || !tabSection.style.display;

    if (tabSection.parentNode.id === id) {
      // If current tab (in iteration) is the clicked tab, then
      // If it is not already opened, open it otherwise close it
      tabSection.style.display = isTabUnselected ? "block" : "none";
      tabSection.parentNode.querySelector("div > span").innerText =
        tabSection.style.display === "none" ? "☝️" : "👇";
    } else {
      // If current tab (in iteration) is not the clicked tab, then
      // Hide its content
      tabSection.style.display = "none";
      tabSection.parentNode.querySelector("div > span").innerText = "☝️";
    }
  });
}

/**
 * Creates and returns Accordion Tab Element.
 *
 * @function getAccordionTab
 * @param {Tab} tab
 * @returns {HTMLDivElement} tabNode
 */
function getAccordionTab(tab) {
  const tabNode = document.createElement("div");
  tabNode.id = tab._id;
  tabNode.className = "accordion-tab";
  tabNode.innerHTML = `<div><h3>${tab.title}</h3><span>☝️</span></div><section>${tab.content}</section>`;
  return tabNode;
}
