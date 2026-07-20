let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply - error callback', function(done) {
        // Create a mock function that simulates a Node.js-style async function with error
        function mockAsyncFunctionWithError(arg1, callback) {
            setTimeout(() => {
                callback(new Error('Test error'));
            }, 10);
        }
        
        // Create a promise from the mock function
        let promisifiedFunction = q.denodeify(mockAsyncFunctionWithError);
        
        // Test nfapply with error
        promisifiedFunction.nfapply(['test'])
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Test error');
                done();
            });
    });

    })