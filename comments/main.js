/**
 * @typedef {Object} PostComment
 * @property {number} id - Comment Id
 * @property {string} name - Full Name of commenter
 * @property {string} username - Username of commenter
 * @property {string} text - Comment Text
 * @property {Array<Comment>|undefined} replies - Reply comments
 */

// DOM Elements
const currentUserSelect = document.querySelector("select");
const commentsWrapper = document.querySelector(".comments-wrapper .comments");
const rootCommentInput = document.querySelector(".comments-input-wrapper input");
const rootCommentSubmit = document.querySelector(".comments-input-wrapper button");
const replyButtons = document.querySelectorAll(".reply-input-wrapper button");

// Constants
const COMMENTS = [
  {
    id: 1,
    name: "John Doe",
    username: "@mrdoe",
    text: "hey this is a comment",
    replies: [],
  },
];

// Event Listeners
rootCommentInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) addRootComment();
});
rootCommentSubmit.addEventListener("click", () => addRootComment());
replyButtons.forEach((btn) => btn.addEventListener("click", onClickReply));

/************************************************************************************************************/

(function init() {
  COMMENTS.forEach((comment) => {
    addRootComment(comment);
  });
})();

/************************************************************************************************************/

/**
 *
 * @function addRootComment
 *
 * @param {PostComment} comment
 * @description Adds a root level post comment
 */
function addRootComment(comment = getDefaultComment()) {
  if (!comment.text) return;
  const markup = getCommentMarkup(comment);
  COMMENTS.push(comment);
  const commentNode = document.createElement("div");
  commentNode.className = "comment";
  commentNode.setAttribute("data-comment-id", comment.id);
  commentNode.innerHTML = markup;
  const replyInput = commentNode.querySelector(".reply-input-wrapper input");
  replyInput.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) onClickReply(e);
  });
  const replyButton = commentNode.querySelector(".reply-input-wrapper button");
  replyButton.addEventListener("click", onClickReply);
  commentsWrapper.appendChild(commentNode);
  rootCommentInput.value = "";
}

/**
 *
 * @function onClickReply
 *
 * @param {Event} e
 * @description handles post reply
 */
function onClickReply(e) {
  const commentNode = e.target.parentElement.parentElement.parentElement;
  const repliesNode = commentNode.querySelector(".comment-replies");
  const replyCommentNode = e.target.parentElement.querySelector("input");
  const replyComment = replyCommentNode.value;
  if (!replyComment) return;
  const commentId = commentNode.getAttribute("data-comment-id");
  const rootComment = COMMENTS.find((c) => c.id === Number(commentId));
  const reply = {
    id: rootComment.replies.length + 1,
    name: getCurrentUser().name,
    username: getCurrentUser().username,
    text: replyComment,
  };
  rootComment.replies.push(reply);
  const replyNode = document.createElement("p");
  replyNode.setAttribute("data-reply-id", reply.id);
  replyNode.setAttribute("data-reply-username", reply.username);
  replyNode.className = "reply-comment";
  replyNode.innerHTML = getReplyNodeMarkup(reply);
  replyNode.querySelector("a").addEventListener("click", onClickChildReply);
  repliesNode.appendChild(replyNode);
  replyCommentNode.value = "";
}

/**
 *
 * @function onClickChildReply
 *
 * @param {Event} e
 * @description handles replies for reply (child reply)
 */
function onClickChildReply(e) {
  const currentRootComment = e.target.parentElement.parentElement.parentElement;
  const currentRootCommentInput = currentRootComment.querySelector(".reply-input-wrapper input");
  const replyUsername = e.target.parentElement.getAttribute("data-reply-username");
  currentRootCommentInput.value = `@${replyUsername} `;
  currentRootCommentInput.focus();
}

/**
 *
 * @function getDefaultComment
 *
 * @returns {PostComment} Comment - Default Comment
 */
function getDefaultComment() {
  const DEFAULT_COMMENT = {
    id: COMMENTS.length + 1,
    name: getCurrentUser().name,
    username: getCurrentUser().username,
    text: rootCommentInput.value,
    replies: [],
  };
  return DEFAULT_COMMENT;
}

/**
 *
 * @function getCurrentUser
 *
 * @returns {{name, username}} Current User
 */
function getCurrentUser() {
  const [name, username] = currentUserSelect.value.split("/");
  return { name, username };
}

/**
 *
 * @param {{name, text}} reply - Reply
 * @returns {string} Reply String
 */
function getReplyNodeMarkup(reply) {
  return `<strong>${reply.name}:</strong> ${reply.text}&nbsp;<a href='#'>reply</a>`;
}

/**
 * @function getCommentMarkup
 * @description Gets Comment markup for the post
 *
 * @param {PostComment} comment
 * @returns {string} PostCommentMarkup
 */
function getCommentMarkup(comment) {
  const { name, username, text, replies } = comment;
  return `<div><b>${name}</b> <em>${username}</em></div>
    <p>${text}</p>
    <div class="comment-action-bar">    
        <div class="reply-input-wrapper">
            <input placeholder="Add a reply" />
            <button>Submit</button>
        </div>
    </div>
    <div class="comment-replies"></div>`;
}
