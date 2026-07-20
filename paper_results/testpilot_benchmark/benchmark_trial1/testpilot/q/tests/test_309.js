let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.denodeify with no arguments', function(done) {
        // Create a mock node-style function with no input arguments
        function nodeStyleFunction(callback) {
            setTimeout(() => {
                callback(null, 'success');
            }, 10);
        }
        
        const denodeified = q.denodeify(nodeStyleFunction);
        
        denodeified()
            .then(result => {
                assert.strictEqual(result, 'success');
                done();
            })
            .catch(done);
    });
});