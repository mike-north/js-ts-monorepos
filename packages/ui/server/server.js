// @ts-check
const Bundler = require("parcel-bundler");
const e = require("express");
const jsonServer = require("json-server");
const server = jsonServer.create();
const { setupAPI } = require("./api-server");
const { join } = require("path");

/**
 * Initialize an API server for shlack
 *
 * @public
 * @param {e.Application} a express application
 * @param {string} dbFilePath Path to json-server database file
 */
function initializeApiServer(a, dbFilePath) {
  const server = jsonServer.create();
  const jsonApiServer = jsonServer.router(dbFilePath);
  setupAPI(jsonApiServer, server);
  a.use(server);
}

/**
 * Initialize a UI middleware for shlack
 *
 * @beta
 * @param {e.Application} a express application
 * @param {string} uiPkgPath path to the UI package
 */
function initializeUiMiddleware(a, uiPkgPath) {
  const file = join(uiPkgPath, "index.html"); // Pass an absolute path to the entrypoint here
  const options = {}; // See options section of api docs, for the possibilities
  // Initialize a new bundler using a file and options
  const bundler = new Bundler(file, options);
  a.use("/assets", e.static(join(uiPkgPath, "assets")));
  a.use(bundler.middleware());
}

const app = e();

const PORT = process.env.PORT || 1234;
const DB_FILE_PATH =
  process.env.DB_FILE_PATH || join(__dirname, "..", "db.json");
const UI_PKG_PATH = join(__dirname, "..");

initializeApiServer(app, DB_FILE_PATH);
initializeUiMiddleware(app, UI_PKG_PATH);

// Listen on port 1234
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
