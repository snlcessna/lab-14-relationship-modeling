'use strict';
require("dotenv").config();

const expect = require('expect');
const app = require('../lib/server.js');
const request = require('superagent');
const Villian = require('../models/villians.js')
const Movie = require('../models/movies.js');

const server = app.listen(3000);

describe('Testing Population of Villians and Movies', () => {
    let movieId = '';
    let villianId = '';
    before(done => {
        Villian.remove({});
        Movie.remove({});
        done();
    });

    after(function(done){
        server.close();
        done();
    });

    it('Should create a new villian using POST', function(done){
        request.post(`localhost:3000/v1/villians`).send({name: 'Jason'}).then(response => {
            villianId = response.body._id;
            expect(response.statusCode).toEqual(200);
            expect(response.body.name).toEqual('Jason');
            done();
        });
    });

    it('Should create a new movie and associate our villians ID to it', function(done){
        request.post('localhost:3000/v1/movies').send({title: 'Halloween', Villian: villianId}).then(response => {
            expect(response.body.title).toEqual('Halloween');
            expect(response.body.Villian[0]).toEqual(villianId);
            movieId = response.body._id;
            done();
        });
    });

    it('Should populate our Halloween movie with our Villian, Jason', function(done) {
        request.get(`localhost:3000/v1/populate/${movieId}`).then(res => {

            // the movie we get back should have the same ID as the Halloween we created earlier
            expect(res.body._id).toEqual(movieId);

            // the movie should contain a villian in it's Villians array that has the _id of our Villian, Jason
            expect(res.body.Villian[0]._id).toEqual(villianId);
            done();
        });
    });
});
