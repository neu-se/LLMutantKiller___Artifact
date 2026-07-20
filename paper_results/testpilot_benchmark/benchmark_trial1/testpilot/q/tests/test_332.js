let mocha = require('mocha');
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
            
            getMultipleValues: function(key1, key2, callback) {
                setTimeout(() => {
                    callback(null, key1 + '-' + key2);
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
                const boundGetMultiple = q.nbind(mockObject.getMultipleValues, mockObject);
                return boundGetMultiple('arg1', 'arg2');
            })
            .then(result => {
                assert.strictEqual(result, 'arg1-arg2');
                
                // Test 4: Null result
                return boundGetValue('null');
            })
            .then(result => {
                assert.strictEqual(result, null);
                done();
            })
            .catch(done);
    });

    })