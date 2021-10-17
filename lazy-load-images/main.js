// DOM Elements
const container = document.getElementById("container");
const target = document.getElementById("images-wrapper");
const images = target.querySelectorAll("img");

/**
 * Initialize the app
 *
 * @function init
 */
(function init() {
  const options = {
    root: container,
    threshold: 1,
    rootMargin: "10px",
  };
  const observer = new IntersectionObserver(onReachedTarget, options);
  observer.observe(target);
})();

/**
 * Lazy loads images once scrolled to the target
 *
 * @function onReachedTarget
 * @param {IntersectionObserverEntry[]} entries
 */
function onReachedTarget(entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      images.forEach(loadImage);
    }
  });
}

/**
 * Loads the image
 *
 * @function loadImage
 * @param {HTMLImageElement} img Image Node
 */
function loadImage(img) {
  const imgUrl = img.getAttribute("data-src");
  img.src = imgUrl;
  img.style.display = "unset";
}
