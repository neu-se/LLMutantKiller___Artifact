let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify with error callback', function(done) {
        // Create a mock node-style function that fails
        function nodeStyleFunction(value, callback) {
            setTimeout(() => {
                callback(new Error('Test error'));
            }, 10);
        }
        
        const promise = q.makePromise(nodeStyleFunction, function(value) {
            return [value];
        });
        const denodeified = promise.denodeify();
        
        denodeified(5)
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Test error');
                done();
            });
    });
});