let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nbind with error handling', function(done) {
        // Create a node-style function that returns an error
        function nodeStyleFunctionWithError(shouldError, callback) {
            setTimeout(() => {
                if (shouldError) {
                    callback(new Error('Test error'));
                } else {
                    callback(null, 'success');
                }
            }, 10);
        }
        
        const promiseFunction = q.nbind(nodeStyleFunctionWithError, null);
        
        promiseFunction(true)
            .then(() => {
                done(new Error('Should have thrown an error'));
            })
            .catch(err => {
                assert.strictEqual(err.message, 'Test error');
                done();
            });
    });
});