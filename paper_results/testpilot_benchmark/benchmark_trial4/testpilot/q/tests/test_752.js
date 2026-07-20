let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fapply with function that throws error', function(done) {
        // Create a function that throws an error
        function throwError() {
            throw new Error('Test error');
        }
        
        let promisedThrow = q.denodeify(throwError);
        
        // Test fapply should catch the error
        promisedThrow.fapply([])
            .then(function() {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Test error');
                done();
            });
    });

    })