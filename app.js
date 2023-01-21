console.log("Web Server start");
const express = require("express");
const app = express();
const router = require("./router");

// MongoDB require
const db = require("./server").db();
const mongodb = require("mongodb");

// 1 Kirish code
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2 Session code

// 3 Views code
app.set("views", "views");
app.set("view engine", "ejs");

// 4 Routing
app.use("/", router);

module.exports = app;
