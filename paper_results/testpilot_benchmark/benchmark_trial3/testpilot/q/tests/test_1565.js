let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spawn with generator that throws error', function(done) {
        function* throwingGenerator() {
            yield 1;
            throw new Error('generator error');
        }
        
        q.spawn(throwingGenerator)
            .then(function(result) {
                done(new Error('Should have rejected'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'generator error');
                done();
            });
    });

    })