let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.async with generator that throws', function(done) {
        const asyncFn = q.async(function* () {
            throw new Error('test error');
        });
        
        asyncFn().then(function(result) {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'test error');
            done();
        });
    });

    })