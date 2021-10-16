// DOM Elements
const cardsSection = document.querySelector("section");

/**
 * Initialize the app
 *
 * @function init
 */
(async function init() {
  const [n, options] = [5, { fetchWithDelay: true, delay: 5000 }];
  const loadingMarkup = getCardListMarkup(Array(n).fill(undefined), true);
  setCardListMarkup(loadingMarkup);
  await fetchRandomUsers(n, options);
})();

// onFetchUsers Event Listener
window.addEventListener("onFetchUsers", onFetchUsers);

/**
 * Updates Card list
 *
 * @function onFetchUsers
 * @param {Event} event Custom Event, invoked once users are fetched from network
 */
function onFetchUsers(event) {
  const { users } = event.detail;
  setCardListMarkup(getCardListMarkup(users, false));
}

/**
 * Sets card list markup to cards section
 *
 * @function setCardListMarkup
 * @param {String} markup Card List Markup String
 */
function setCardListMarkup(markup) {
  cardsSection.innerHTML = markup;
}

/**
 * Gives Card List Markup
 *
 * @function getCardListMarkup
 * @param {Array} users User Object Array
 * @param {Boolean} isLoading if true, returns loading card list markup
 * @returns Card List Markup
 */
function getCardListMarkup(users, isLoading = false) {
  return users.map((u) => getCardMarkup(u, isLoading)).join("");
}

/**
 * Gives User Card Markup
 *
 * @function getCardMarkup
 * @param {Object} user User Object
 * @param {Boolean} isLoading if true, returns loading card
 * @returns Card Markup
 */
function getCardMarkup(user, isLoading = false) {
  if (isLoading) {
    return `<div class="card"> <span class='user-image loading'></span> <div><h3 class="loading"></h3><div class="user-details"><div><b>Email: </b> <span class="loading"></span></div><div><b>Phone: </b> <span class="loading"></span></div></div></div></div>`;
  }
  return `<div class="card"><span class='user-image'><img src='${user.picture.thumbnail}' alt='user'></span><div><h3>${user.name.first}${user.name.last}</h3><div class="user-details"><div><b>Email: </b> <span>${user.email}</span></div><div><b>Phone: </b> <span>${user.phone}</span></div></div></div></div>`;
}

/**
 * Fetches n random users from RandomUser API with/without delay.
 *
 * @async
 * @function fetchRandomUsers
 * @param {Number} n - Number of users.
 * @return {Promise<Array>} - Users array.
 */
async function fetchRandomUsers(n = 10, options = {}) {
  const { fetchWithDelay = false, delay = 0 } = options;

  return new Promise((resolve, reject) => {
    fetch(
      `https://randomuser.me/api/?results=${n}&inc=name,email,phone,picture`
    )
      .then((res) => res.json())
      .then((users) => {
        if (fetchWithDelay) {
          setTimeout(() => {
            dispatchEvent(
              new CustomEvent("onFetchUsers", {
                detail: { users: users.results },
              })
            );
            resolve(users.results);
          }, delay);
        } else {
          dispatchEvent(
            new CustomEvent("onFetchUsers", {
              detail: { users: users.results },
            })
          );
          resolve(users.results);
        }
      })
      .catch(reject);
  });
}
