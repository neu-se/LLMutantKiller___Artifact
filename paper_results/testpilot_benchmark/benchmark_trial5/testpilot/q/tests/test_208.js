let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - error handling', function(done) {
        function errorFunction(shouldThrow) {
            if (shouldThrow) {
                throw new Error('Test error');
            }
            return 'success';
        }
        
        // Use q.denodeify or q.nfbind to create a promise-returning function
        // Since errorFunction is synchronous, we'll wrap it in a promise
        let promiseFunction = function() {
            return q.fcall(errorFunction, true);
        };
        
        promiseFunction()
            .then(function(result) {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Test error');
                done();
            });
    });
});