let mocha = require('mocha');
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
        
        const denodeified = q.denodeify(nodeStyleFunction);
        
        denodeified(5).then(function(result) {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.strictEqual(error.message, 'Test error');
            done();
        });
    });
});