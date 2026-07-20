let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply - error callback', function(done) {
        // Create a mock function that simulates an error
        function mockErrorFunction(arg1, callback) {
            setTimeout(() => {
                callback(new Error('Test error'));
            }, 10);
        }
        
        // Test nfapply with error handling
        q.nfapply(mockErrorFunction, ['test'])
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Test error');
                done();
            });
    });
});