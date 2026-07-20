let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.ninvoke with successful callback', function(done) {
        // Create a mock object with a method that uses Node.js callback pattern
        const mockObject = {
            getData: function(key, callback) {
                // Simulate async operation
                setTimeout(() => {
                    callback(null, `data for ${key}`);
                }, 10);
            }
        };

        q.ninvoke(mockObject, 'getData', 'user:1')
            .then(result => {
                assert.strictEqual(result, 'data for user:1');
                done();
            })
            .catch(done);
    });

    })