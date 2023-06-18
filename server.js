/**
 * All server logics in this module
 *
 */
require("colors");
const http = require("http");
const app = require("./app/app");
const dotenv = require("dotenv");
dotenv.config();

//Creating Server
const httpServer = http.createServer(app);

const APP_PORT = process.env.PORT;
httpServer.listen(APP_PORT, function () {
  console.log(`HTTP SERVER STARTED ON PORT ${APP_PORT}`.bgGreen.bold);
});

//On server closed from user intervention : CTRL+C
process.on("SIGINT", function () {
  console.log("SERVER CLOSED !");
  process.exit();
});
