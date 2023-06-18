/**
 * All application logics in this module
 */

const express = require("express");
const connectDB = require("../config/db-config");

const path = require("path");
const app = express(); //Initialize express instance
app.use(express.static(path.join(__dirname, "public"))); // Use to server static files

// Parse JSON data || payload from incoming requests
//and make it available in req.body object
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectDB();

module.exports = app;
