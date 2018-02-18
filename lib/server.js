'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const sendMessage = require('./sendMsg.js');
require("dotenv").config();

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/lab14');

app.use(require('../routes/routes.js'));

module.exports = app;
