// DOM Elements
const pageNumber = document.getElementById("page-number");
const userCardWrapper = document.getElementById("user-card-wrapper");
const pageAction = document.getElementById("page-action");
const pageActionButtonSpan = pageAction.querySelector("div > span");
const pageActionGoto = document.getElementById("page-action-goto");
const pageActionGotoInput = pageActionGoto.querySelector("input");
const pageActionGotoButton = pageActionGoto.querySelector("button");
const PER_PAGE_COUNT = 5;

// Variables
let currentPage;
let users;

/**
 * Initialize the app.
 *
 * @async
 * @function init
 */
(async function init() {
  users = await fetchRandomUsers(500);
  const pagesLength = users.length / PER_PAGE_COUNT;
  appendUsers(0, PER_PAGE_COUNT);
  setPageNumber(1);
  appendPageButton(pagesLength);
})();

// Event Listeners
window.addEventListener("onPageButtonClick", (e) => gotoPage(e.detail.page));
pageActionGotoButton.addEventListener("click", onClickGotoButton);

/* ********************************************************************************* */

/**
 * Goto specific page, input by user.
 *
 * @function onClickGotoButton
 */
function onClickGotoButton() {
  const page = Number(pageActionGotoInput.value);
  if (page < 0 || page > users.length / PER_PAGE_COUNT) {
    return alert("Invalid Page No.");
  }
  gotoPage(page);
}

/**
 * It does following things:
 * - Sets page number, which is shown in UI.
 * - Updates users list and shows that page users.
 * - Changes page buttons as per page number.
 *
 * @function gotoPage
 * @param {number|string} p
 */
function gotoPage(p) {
  setPageNumber(p);
  appendUsers(...getPageUsersIndex(p));
  appendPageButton(users.length / PER_PAGE_COUNT, p);
}

/**
 * Sets page number, which is shown in UI.
 *
 * @function setPageNumber
 * @param {number|string} p
 */
function setPageNumber(p) {
  currentPage = p;
  pageNumber.querySelector("span").innerText = p;
}

/**
 * Returns range of users (indices) for a specific page.
 *
 * @function getPageUsersIndex
 * @param {number|string} p
 * @returns {[number, number]}
 */
function getPageUsersIndex(p) {
  const startIndex = p * PER_PAGE_COUNT - (PER_PAGE_COUNT - 1);
  const endIndex = p * PER_PAGE_COUNT;
  return [startIndex - 1, endIndex];
}

/**
 * Returns UserCard Node.
 *
 * @function getUserCard
 * @param {Object} user
 * @returns {HTMLDivElement}
 */
function getUserCard(user) {
  const userCard = document.createElement("div");
  userCard.className = "user-card";
  userCard.innerHTML = `<div>
      <img
        src="${user.picture.thumbnail}"
        alt=""
      />
    </div>
    <div>
      <strong>${user.name.first} ${user.name.last}</strong>
      <span>${user.email}</span>
      <span>${user.phone}</span>
    </div>`;
  return userCard;
}

/**
 * Removes old user cards and appends users with [startIndex, endIndex] range.
 *
 * @function appendUsers
 * @param {number} startIndex
 * @param {number} endIndex
 */
function appendUsers(startIndex, endIndex) {
  userCardWrapper.innerHTML = "";
  const updatedUsers = users.slice(startIndex, endIndex);
  const userCards = updatedUsers.map((u) => getUserCard(u));
  userCardWrapper.append(...userCards);
}

/**
 * Removes old buttons and appends page button as per current page.
 * @param {number} l - Total Pages Length
 * @param {number} c - Current Page
 */
function appendPageButton(l, c = 1) {
  if (l < 0) l = 1;
  pageActionButtonSpan.innerHTML = "";
  pageActionButtonSpan.append(...getPageButtonsArray(l, c));
}

/**
 * Returns page button nodes as per current page.
 *
 * @function getPageButtonsArray
 * @param {number} l - Total Pages Length
 * @param {number} c - Current Page
 * @returns {Array<HTMLElement>}
 */
function getPageButtonsArray(l, c = 1) {
  if (l > 5) {
    if (c > 2 && c < l - 1) {
      return [
        getPageButton(1),
        getBetweenPageSpan(),
        getPageButton(c),
        getBetweenPageSpan(),
        getPageButton(l),
      ];
    }
    return [
      getPageButton(1),
      getPageButton(2),
      getBetweenPageSpan(),
      getPageButton(l - 1),
      getPageButton(l),
    ];
  }
  return Array(l)
    .fill(null)
    .map((_, i) => getPageButton(i + 1));
}

/**
 * Returns a span containing (...)
 *
 * @function getBetweenPageSpan
 * @returns {HTMLSpanElement}
 */
function getBetweenPageSpan() {
  const betweenSpan = document.createElement("span");
  betweenSpan.innerText = "...";
  return betweenSpan;
}

/**
 * Returns Page Button node
 *
 * @function getPageButton
 * @param {number} p
 * @returns {HTMLButtonElement}
 */
function getPageButton(p) {
  const pageButton = document.createElement("button");
  pageButton.innerText = p;
  pageButton.onclick = function () {
    dispatchEvent(
      new CustomEvent("onPageButtonClick", { detail: { page: p } })
    );
  };
  return pageButton;
}

/**
 * Fetches n random users from RandomUser API
 *
 * @async
 * @function fetchRandomUsers
 * @param {Number} n - Number of users.
 * @return {Promise<Array>} - Users array.
 */
function fetchRandomUsers(n = 10) {
  return new Promise((resolve, reject) => {
    fetch(`https://randomuser.me/api/?results=${n}`)
      .then((res) => res.json())
      .then((_users) => resolve(_users.results))
      .catch(reject);
  });
}
