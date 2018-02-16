'use strict';

const mongoose = require('mongoose');
const Movie = require('./movies.js');

const Schema = mongoose.Schema;
const villianSchema = new Schema({
    name: String,
});


const Villian = module.exports = mongoose.model('Villian', villianSchema);
