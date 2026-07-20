let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify with no arguments', function(done) {
        // Create a mock node-style function that takes no arguments except callback
        function nodeStyleFunction(callback) {
            setTimeout(() => {
                callback(null, 'success');
            }, 10);
        }
        
        const promise = q.makePromise(nodeStyleFunction, function() {
            return Array.prototype.slice.call(arguments);
        });
        
        const denodeified = promise.denodeify();
        
        denodeified().then(function(result) {
            assert.strictEqual(result, 'success');
            done();
        }).catch(done);
    });
});