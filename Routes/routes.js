const express = require('express');
const jsonParser = require('body-parser').json();
const Villian = require(`${__dirname}/../models/villians.js`);
const Movie = require('../models/movies.js');
const sendMessage = require('../lib/sendMsg.js');

const Router = module.exports = express.Router();

Router.post('/villians', jsonParser ,(req, res, next) => {
  console.log(req.body);
    const newVillian = new Villian(req.body);
    newVillian.save().then(message => res.send(message))
    .catch(err => next({error: err}));
});

Router.get('/villians/:id', (req, res, next) => {
    Villian.findOne({_id: req.params.id})
    .then(villian => res.send(villian))
    .catch(err => next({error: err}));
});

Router.get('/villians', (req, res) => {
    Villian.find(req.query || {})
        .then(villians => res.send(villians))
        .catch(err => res.send('No'));
});

Router.put('/villians/:id',jsonParser,  (req, res, next) => {
    if (typeof req.body['_id'] !== 'undefined') delete req.body._id;
    Villian.findOneAndUpdate({_id: req.params.id}, req.body)
      .then(data => res.send(data))
      .catch(err => next({error: err}));
});

Router.patch('/villians/:id', jsonParser ,(req, res, next) => {
    if (typeof req.body._id !== 'undefined') delete req.body._id;
    Villian.findOneAndUpdate({_id: req.params.id}, {$set: req.body}).then(data => res.send('Patched!')).catch(err => next({error: err}));
});

Router.delete('/villians/:id', (req, res, next) => {
    Villian.remove({_id: req.params.id}).then(res.send('Villian Deleted!')).catch(err => next({error: err}));
});

Router.get('/movies', (req, res) => {
    Movie.find(req.query || {})
    .then(movie => res.send(movie))
    .catch(err => next({error: err}));
});

Router.get('/movies/:id', (req, res) => {
    Movie.findOne({_id: req.params.id})
    .then(villian => res.send(villian))
    .catch(err => next({error: err}));
});

Router.post('/movies', jsonParser ,(req, res, next) => {
    const newMovie = new Movie(req.body);
    newMovie.save().then(message => res.send(message))
    .catch(err => next({error: err}));
});

Router.put('/movies/:id', jsonParser, (req, res) => {
    if (typeof req.body['_id'] !== 'undefined') delete req.body._id;
    Movie.findOneAndUpdate({_id: req.params.id}, req.body)
      .then(data => res.send(data))
      .catch(err => next({error: err}));
});

Router.delete('/movies/:id', (req, res) => {
    Movie.remove({_id: req.params.id})
    .then(res.send('Movie Deleted'))
    .catch(err => next({error: err}));
});

Router.patch('/movies/:id', jsonParser, (req, res, next) => {
    if (typeof req.body._id !== 'undefined') delete req.body._id;
    Movie.findOneAndUpdate({_id: req.params.id}, {$set: req.body})
    .then(data => res.send('Patched!'))
    .catch(err => next({error: err}));
});

Router.get('/associate/:movie/:villian', (req, res) => {
    const newVillian = new Villian({title: req.params.villian});
    newVillian.save().then(message => {
        const newMovie = new Movie({title: req.params.movie, Villian: newVillian._id});
        newMovie.save().then(message => res.send(message));
        });
  })

Router.get('/populate/:id', (req, res) => {
    Movie.findOne({_id: req.params.id}).populate('Villian').exec((err, reply) => {
        res.send(err || reply);
    });
});
