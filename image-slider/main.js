// DOM Elements
const imageContainer = document.querySelector(".image-container");
const nextImageButton = document.querySelector(".next-button");
const previousImageButton = document.querySelector(".previous-button");

// Slider Images
const images = Array(10)
  .fill(null)
  .map((_, i) => `https://picsum.photos/id/${i}/360/180`);

// Constants
const MIN_OPACITY = "0.2";
const MAX_OPACITY = "0.5";

// Current Image
let currentImageId;

// Event Listeners
nextImageButton.addEventListener("click", onClickNextImage);
previousImageButton.addEventListener("click", onClickPreviousImage);

/**
 * Initialize the app by fetching all images and appending corresponding
 * <img> node to image container.
 *
 * @function init
 */
(function init() {
  images.forEach((img) => {
    const imgElement = document.createElement("img");
    imgElement.src = img;
    imgElement.style.visibility = "hidden";
    imgElement.style.position = "absolute";
    imageContainer.appendChild(imgElement);
  });
  setImageInSlider();
})();

/**
 * Sets ith image from images array in slider.
 *
 * @function setImageInSlider
 * @param {Number} i - image index
 */
function setImageInSlider(i = 0) {
  currentImageId = i;

  if (i === 0) {
    // If first image, disable previous image button and enable next image button.
    setButtonOpacity("previous");
    setButtonOpacity("next", MAX_OPACITY);
  } else if (i === images.length - 1) {
    // If last image, disable next image button, enable previous image button.
    setButtonOpacity("next");
    setButtonOpacity("previous", MAX_OPACITY);
  } else {
    // If image between first and last image, enable both buttons.
    setButtonOpacity("next", MAX_OPACITY);
    setButtonOpacity("previous", MAX_OPACITY);
  }

  // Hide all images in slider
  const otherImages = document.querySelectorAll(`.image-container img`);
  otherImages.forEach((i) => (i.style.visibility = "hidden"));

  // Show ith image from images array in slider.
  const img = document.querySelector(
    `.image-container img:nth-of-type(${i + 1})`
  );
  img.style.visibility = "unset";
}

/**
 * Shows next image in slider.
 *
 * @function onClickNextImage
 */
function onClickNextImage() {
  if (currentImageId + 1 >= images.length) return;
  setImageInSlider(currentImageId + 1);
}

/**
 * Shows previous image in slider.
 *
 * @function onClickPreviousImage
 */
function onClickPreviousImage() {
  if (currentImageId === 0) return;
  setImageInSlider(currentImageId - 1);
}

/**
 * Sets slider action button opacity
 *
 * @function setButtonOpacity
 * @param {(previous|next)} buttonType
 * @param {Number} opacity
 */
function setButtonOpacity(buttonType, opacity = MIN_OPACITY) {
  if (buttonType === "previous") previousImageButton.style.opacity = opacity;
  if (buttonType === "next") nextImageButton.style.opacity = opacity;
}
