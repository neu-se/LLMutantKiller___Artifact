let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fapply with function that throws error', function(done) {
        // Create a function that throws an error
        function throwError() {
            throw new Error('Test error');
        }
        
        // Create a promise that resolves to the function
        let promiseOfFunction = q.resolve(throwError);
        
        // Test fapply with error case
        promiseOfFunction.fapply([])
            .then(function() {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Test error');
                done();
            });
    });
});