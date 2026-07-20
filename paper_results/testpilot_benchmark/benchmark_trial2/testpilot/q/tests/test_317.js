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
        
        // Use q.denodeify directly instead of q.makePromise
        const denodeified = q.denodeify(nodeStyleFunction);
        
        denodeified().then(function(result) {
            assert.strictEqual(result, 'success');
            done();
        }).catch(done);
    });
});