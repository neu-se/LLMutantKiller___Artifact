let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke', function(done) {
        // Create a mock object with a Node.js-style callback method
        let mockObject = {
            getData: function(key, callback) {
                // Simulate async operation
                setTimeout(() => {
                    if (key === 'valid') {
                        callback(null, 'success data');
                    } else {
                        callback(new Error('Invalid key'));
                    }
                }, 10);
            },
            
            multiply: function(a, b, callback) {
                setTimeout(() => {
                    callback(null, a * b);
                }, 10);
            }
        };

        // Convert the mock object to a Q promise-enabled object
        let promiseObject = q(mockObject);

        // Test successful case
        promiseObject.ninvoke('getData', 'valid')
            .then(function(result) {
                assert.equal(result, 'success data');
                
                // Test with multiple arguments
                return promiseObject.ninvoke('multiply', 5, 3);
            })
            .then(function(result) {
                assert.equal(result, 15);
                
                // Test error case
                return promiseObject.ninvoke('getData', 'invalid');
            })
            .then(function() {
                // Should not reach here
                assert.fail('Expected promise to be rejected');
            })
            .catch(function(error) {
                assert(error instanceof Error);
                assert.equal(error.message, 'Invalid key');
                done();
            })
            .catch(done);
    });

    })