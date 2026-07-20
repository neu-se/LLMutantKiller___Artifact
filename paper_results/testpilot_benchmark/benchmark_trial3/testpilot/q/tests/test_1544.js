let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.async with rejected promise', function(done) {
        const asyncFn = q.async(function* () {
            yield q.reject(new Error('rejected promise'));
        });
        
        asyncFn().then(function(result) {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'rejected promise');
            done();
        });
    });

    })