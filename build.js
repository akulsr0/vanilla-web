const fs = require("fs");

/**
 * Initialize build process
 *
 * @function init
 */
(function init() {
  const vanillaApps = fs
    .readdirSync(__dirname, { withFileTypes: true })
    .filter(isDirentValidDirectory)
    .map((dir) => dir.name);

  const listItems = vanillaApps.map(getListItemString).join("");
  const buildMarkup = getBuildMarkup(listItems);
  fs.writeFileSync("index.html", buildMarkup);
})();

/**
 * Returns final build markup
 *
 * @function getBuildMarkup
 * @param {String} listItems
 * @returns {String} Final Markup String
 */
function getBuildMarkup(listItems) {
  return `<!DOCTYPE html><html lang="en"> <head> <meta charset="UTF-8"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <title>Vanilla Web</title> </head> <body> <h1>Welcome to Vanilla Web</h1> <p> A list of vanilla web implementations of some common and important concepts. </p><p> Source Code for this project can be found <a target="_blank" href="https://github.com/akulsr0/vanilla-web/">here</a> </p><h2>Apps</h2> <ul id="vanilla-apps-list">${listItems}</ul> </body></html>`;
}

/**
 * Title Cases a word
 * eg. accordion -> Accordion
 *
 * @function toTitle
 * @param {string} w
 * @returns {string} Title Cased Word
 */
function toTitle(w) {
  return w[0].toUpperCase() + w.slice(1).toLowerCase();
}

/**
 * Returns apps list item markup
 *
 * @function getListItemString
 * @param {string} app
 * @returns {string}
 */
function getListItemString(app) {
  const appTitle = app.split("-").map(toTitle).join(" ");
  return `<li><a href="./${app}">${appTitle}</a></li>`;
}

/**
 * Checks if a dirent is a directory and is not hidden.
 *
 * @function isDirentValidDirectory
 * @param {fs.Dirent} dirent
 * @returns {boolean}
 */
function isDirentValidDirectory(dirent) {
  const isDirentHidden = dirent.name.startsWith(".");
  return dirent.isDirectory() && !isDirentHidden;
}
