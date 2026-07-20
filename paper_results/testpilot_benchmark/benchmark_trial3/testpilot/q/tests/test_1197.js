let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind', function(done) {
        // Create a mock object with a method that follows Node.js callback convention
        const mockObject = {
            getValue: function(key, callback) {
                // Simulate async operation
                setTimeout(() => {
                    if (key === 'valid') {
                        callback(null, 'success value');
                    } else if (key === 'error') {
                        callback(new Error('test error'));
                    } else {
                        callback(null, null);
                    }
                }, 10);
            },
            
            multiply: function(a, b, callback) {
                setTimeout(() => {
                    callback(null, a * b);
                }, 10);
            }
        };

        // Test 1: Basic nbind functionality
        const boundGetValue = q.nbind(mockObject.getValue, mockObject);
        
        boundGetValue('valid')
            .then(result => {
                assert.strictEqual(result, 'success value');
                
                // Test 2: Error handling
                return boundGetValue('error');
            })
            .then(() => {
                assert.fail('Should have thrown an error');
            })
            .catch(err => {
                assert.strictEqual(err.message, 'test error');
                
                // Test 3: Multiple arguments
                const boundMultiply = q.nbind(mockObject.multiply, mockObject);
                return boundMultiply(5, 3);
            })
            .then(result => {
                assert.strictEqual(result, 15);
                
                // Test 4: Null result
                return boundGetValue('null');
            })
            .then(result => {
                assert.strictEqual(result, null);
                done();
            })
            .catch(done);
    });
});