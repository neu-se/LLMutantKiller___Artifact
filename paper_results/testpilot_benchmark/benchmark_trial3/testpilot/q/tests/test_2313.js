let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.npost - successful method call', function(done) {
        // Create a test object with a method that uses node-style callback
        let testObj = {
            add: function(a, b, callback) {
                // Simulate async operation
                setTimeout(() => {
                    callback(null, a + b);
                }, 10);
            }
        };

        q.npost(testObj, 'add', [5, 3])
            .then(function(result) {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });
});