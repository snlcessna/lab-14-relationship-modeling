'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Villian = require('./villians.js')

var movieSchema = Schema({
    title: String,
    Villian: [{ type: Schema.Types.ObjectId, ref: 'Villian' }]
  });


const Movie = module.exports = mongoose.model('Movie', movieSchema);
