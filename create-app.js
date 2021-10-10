const fs = require("fs");

/**
 * Checks for app names and create app directory for each.
 *
 * @function init
 */
(function init() {
  const appNames = Array.prototype.slice.call(process.argv, 2);
  appNames.forEach(createApp);
})();

/**
 * Creates app folder and adds markup, css and javascript files with bare minimum code.
 *
 * @function createApp
 * @param {string} name
 */
function createApp(name) {
  const title = name.split("-").map(toTitle).join(" ");

  const markup = `<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>${title}</title><link rel="stylesheet" href="/${name}/styles.css" /></head><body> <h1> <a href="/">Vanilla Web</a> </h1> <h2>${title}</h2> <p> Source Code for this project can be found <a target="_blank" href="https://github.com/akulsr0/vanilla-web/tree/main/${name}" >here</a > </p><hr/></body><script src="/${name}/main.js"></script></html>`;

  const css = `/* Write your css code here */`;
  const js = `// Write your js code here`;

  const dir = `${__dirname}/${name}`;

  fs.mkdirSync(dir);
  fs.writeFileSync(`${dir}/index.html`, markup);
  fs.writeFileSync(`${dir}/styles.css`, css);
  fs.writeFileSync(`${dir}/main.js`, js);
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
