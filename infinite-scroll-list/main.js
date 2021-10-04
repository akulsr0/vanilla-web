const usersList = documentgetElementById("users-list"); // Users List - HTMLElement
let isListUpdating = false; // Flag to not call API if it is already being called.

/**
 * Initialize app by adding users to the user list.
 *
 * @async
 * @function init
 */
(async function init() {
  const users = await fetchRandomUsers();
  users.forEach((user) => usersList.appendChild(getUserCard(user)));
})();

// Event Listeners
window.addEventListener("onFetchUsers", onFetchUsers);
window.addEventListener("onFetchUsersCompleted", onFetchUsersCompleted);

/* ************************************************************* */

/**
 * Update users list when scrolled to bottom of page.
 *
 * @async
 * @function onscroll
 */
window.onscroll = async function () {
  const isScrolledToBottom =
    window.innerHeight + window.scrollY >= document.body.scrollHeight;
  if (isScrolledToBottom && !isListUpdating) {
    isListUpdating = true;
    const options = { fetchWithDelay: true, delay: 3000 };
    const users = await fetchRandomUsers(5, options);
    isListUpdating = false;
    users.forEach((user) => usersList.appendChild(getUserCard(user)));
  }
};

/**
 * Fetches n random users from RandomUser API with/without delay.
 *
 * @async
 * @function fetchRandomUsers
 * @param {Number} n - Number of users.
 * @return {Promise<Array>} - Users array.
 */
function fetchRandomUsers(n = 10, options = {}) {
  const { fetchWithDelay = false, delay = 0 } = options;

  return new Promise((resolve, reject) => {
    dispatchEvent(new CustomEvent("onFetchUsers"));
    fetch(`https://randomuser.me/api/?results=${n}&inc=name,email,phone`)
      .then((res) => res.json())
      .then((users) => {
        if (fetchWithDelay) {
          setTimeout(() => {
            dispatchEvent(new CustomEvent("onFetchUsersCompleted"));
            resolve(users.results);
          }, delay);
        } else {
          dispatchEvent(new CustomEvent("onFetchUsersCompleted"));
          resolve(users.results);
        }
      })
      .catch(reject);
  });
}

/**
 * Returns HTMLLIElement for users list.
 *
 * @function getUserCard
 * @return {HTMLLIElement} User Card
 */
function getUserCard(user) {
  const { name, email, phone } = user;
  const userCard = document.createElement("li");
  userCard.innerHTML = `
    <strong>Name:</strong> ${name.first} ${name.last} <br>
    <strong>Email:</strong> ${email} <br>
    <strong>Phone:</strong> ${phone}
  `;
  return userCard;
}

/**
 * Adds loading gif to list when users are being fetched.
 *
 * @function onFetchUsers
 */
function onFetchUsers() {
  const loading = document.createElement("img");
  loading.className = "loading";
  loading.src = "https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif";
  usersList.appendChild(loading);
}

/**
 * Removes loading gif from list once users are fetched.
 *
 * @function onFetchUsersCompleted
 */
function onFetchUsersCompleted() {
  const loadingAnimation = usersList.getElementsByClassName("loading");
  for (let i = 0; i < loadingAnimation.length; i++) {
    usersList.removeChild(loadingAnimation[i]);
  }
}
