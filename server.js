/**
 * All server logics in this module
 *
 */
require("colors");
const fs = require("fs");
const http = require("http");
const https = require("https");
const app = require("./app/app");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === "DEVELOPMENT") {
  //Creating Server
  const httpServer = http.createServer(app);

  const HTTP_PORT = process.env.HTTP_PORT;
  httpServer.listen(HTTP_PORT, function () {
    console.log(
      `HTTP SERVER STARTED ON PORT ${HTTP_PORT}\nON ${NODE_ENV} SERVER`.bgGreen
        .bold
    );
    console.log(`SSL ENABLED : FALSE`.bgRed.bold);
  });
} else if (NODE_ENV === "PRODUCTION") {
  //ENABLING SSL IN PRODUCTION READY SYSTEM
  const options = {
    key: fs.readFileSync(
      path.join(__dirname, "app/app-credentials/ssl/key.pem")
    ),
    cert: fs.readFileSync(
      path.join(__dirname, "app/app-credentials/ssl/cert.pem")
    ),
  };
  const httpsServer = https.createServer(options, app);
  const HTTPS_PORT = process.env.HTTPS_PORT;
  httpsServer.listen(HTTPS_PORT, function () {
    console.log(
      `HTTPS SERVER STARTED ON PORT ${HTTPS_PORT}\nON ${NODE_ENV} SERVER`
        .bgGreen.bold
    );
    console.log(`SSL ENABLED : TRUE`.bgBlue.bold);
  });
}

/**
 * GENERATING PRIVATE KEY AND CERTIFICATE USING OPENSSL
 *
 * STEP 1: openssl genpkey -algorithm RSA -out private-key.pem : This code generates private key
 * STEP 2: openssl req -new -key private-key.pem -out csr.pem  : Generates CSR (Certificate Signing Request)
 * STEP 3: openssl x509 -req -days 365 -in csr.pem -signkey private-key.pem -out certificate.pem : Generates Certificates
 *
 *
 *
 * Copy Files From Step 1 and Step 3 in Desired folder
 *
 *
 */

//On server closed from user intervention : CTRL+C
process.on("SIGINT", function () {
  console.log("SERVER CLOSED !");
  process.exit();
});
