let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.ninvoke with successful callback', function(done) {
        // Create a mock object with a method that follows Node.js callback convention
        const mockObject = {
            getData: function(key, callback) {
                // Simulate async operation
                setTimeout(() => {
                    callback(null, `data for ${key}`);
                }, 10);
            }
        };

        q.ninvoke(mockObject, 'getData', 'test-key')
            .then(result => {
                assert.strictEqual(result, 'data for test-key');
                done();
            })
            .catch(done);
    });

    })