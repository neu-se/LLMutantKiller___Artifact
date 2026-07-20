let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nbind with successful callback', function(done) {
        // Mock object with a method that follows Node.js callback convention
        const mockObject = {
            getValue: function(key, callback) {
                // Simulate async operation
                setTimeout(() => {
                    callback(null, `value-${key}`);
                }, 10);
            }
        };

        // Bind the method using q.nbind
        const boundGetValue = q.nbind(mockObject.getValue, mockObject);

        // Test the bound function
        boundGetValue('test-key')
            .then(result => {
                assert.strictEqual(result, 'value-test-key');
                done();
            })
            .catch(done);
    });

    })