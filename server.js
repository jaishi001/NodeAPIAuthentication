/**
 * All server logics in this module
 * 
 */

const http = require('http');
const app = require('./app/app');
const dotenv = require('dotenv');
dotenv.config();

//Creating Server
const httpServer = http.createServer(app);

const APP_PORT = process.env.PORT;
httpServer.listen(APP_PORT,function(){
    console.log('HTTP SERVER CONNECTED!');
    console.log(`SERVER STARTED ON PORT ${APP_PORT}`);
});

//On server closed from user intervention : CTRL+C
process.on('SIGINT',function(){
    console.log('SERVER CLOSED !');
    process.exit();
});