let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.catch - should catch rejection from promise chain', function(done) {
        let errorMessage = 'Test error';
        
        q.fcall(function() {
            return 'step1';
        })
        .then(function(value) {
            throw new Error(errorMessage);
        })
        .then(function(value) {
            // This should not execute
            assert.fail('Should not reach this step');
        })
        .catch(function(error) {
            assert.equal(error.message, errorMessage);
            done();
        });
    });

    })