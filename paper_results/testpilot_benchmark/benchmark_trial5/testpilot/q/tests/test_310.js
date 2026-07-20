let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify with error callback', function(done) {
        // Create a mock node-style function that fails
        function nodeStyleFunction(value, callback) {
            setTimeout(() => {
                if (value < 0) {
                    callback(new Error('Negative value not allowed'));
                } else {
                    callback(null, value);
                }
            }, 10);
        }
        
        // Use q.denodeify directly on the node-style function
        const denodeified = q.denodeify(nodeStyleFunction);
        
        denodeified(-1)
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Negative value not allowed');
                done();
            });
    });
});