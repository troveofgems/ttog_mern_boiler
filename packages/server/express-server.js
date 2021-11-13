const // Environment variables managed By dotenv as a preloaded file.
  {
    USE_DEFAULT_PORT,
    SERVE_DEFAULT_PORT, SERVE_CUSTOM_PORT
  } = process.env,
  PORT = (USE_DEFAULT_PORT === 'true') ? SERVE_DEFAULT_PORT : SERVE_CUSTOM_PORT,
  { configureExpress } = require('./config/express'),
  { createSemiSecureApplication } = require('./config/express/opt/security'),
  { openDatabaseConnection } = require('./config/db'),
  { mountRouterToApplication } = require("./router"),
  { attachCleanupProcessListeners } = require('./utils/dev/processListeners.utils');

const Application = createSemiSecureApplication();

let serverList = { // Track All Servers That Are Opened
  expressServer: null, dbServer: null
};

configureExpress(Application, __dirname); // Configure The Express Server

let dbServer = openDatabaseConnection(); // Open Connection To DB

mountRouterToApplication(Application); // Mount Router To Application

serverList.expressServer = Application.listen(PORT);

attachCleanupProcessListeners(serverList);