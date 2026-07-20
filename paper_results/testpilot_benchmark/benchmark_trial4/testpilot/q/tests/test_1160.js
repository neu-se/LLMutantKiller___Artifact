let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify with no arguments', function(done) {
        // Create a mock node-style function with no input arguments
        function nodeStyleFunction(callback) {
            setTimeout(() => {
                callback(null, 'success');
            }, 10);
        }
        
        const promise = q.makePromise(nodeStyleFunction, function() {
            return [];
        });
        const denodeified = promise.denodeify();
        
        denodeified()
            .then(result => {
                assert.strictEqual(result, 'success');
                done();
            })
            .catch(done);
    });
});