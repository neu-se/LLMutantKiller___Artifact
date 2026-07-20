let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q promisification with npost-like functionality', function(done) {
        // Create a mock object with a method that follows Node.js callback convention
        let mockObject = {
            getValue: function(key, callback) {
                // Simulate async operation
                setTimeout(() => {
                    if (key === 'valid') {
                        callback(null, 'success');
                    } else {
                        callback(new Error('Invalid key'));
                    }
                }, 10);
            },
            
            addNumbers: function(a, b, callback) {
                setTimeout(() => {
                    callback(null, a + b);
                }, 10);
            }
        };

        // Create a helper function that mimics npost behavior
        function npost(obj, methodName, args) {
            return q.nfapply(obj[methodName].bind(obj), args);
        }

        // Test successful case
        npost(mockObject, 'getValue', ['valid'])
            .then(result => {
                assert.equal(result, 'success');
                
                // Test with multiple arguments
                return npost(mockObject, 'addNumbers', [5, 3]);
            })
            .then(result => {
                assert.equal(result, 8);
                
                // Test error case
                return npost(mockObject, 'getValue', ['invalid']);
            })
            .then(() => {
                // Should not reach here
                assert.fail('Expected promise to be rejected');
            })
            .catch(error => {
                assert.equal(error.message, 'Invalid key');
                done();
            })
            .catch(done);
    });
});