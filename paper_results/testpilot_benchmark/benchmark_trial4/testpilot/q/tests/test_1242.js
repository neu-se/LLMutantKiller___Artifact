let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke', function(done) {
        // Create a mock object with a Node.js-style callback method
        let mockObject = {
            getValue: function(key, callback) {
                // Simulate async operation
                setTimeout(() => {
                    if (key === 'valid') {
                        callback(null, 'success_value');
                    } else {
                        callback(new Error('Invalid key'));
                    }
                }, 10);
            },
            
            add: function(a, b, callback) {
                setTimeout(() => {
                    callback(null, a + b);
                }, 10);
            }
        };

        // Convert the mock object to a Q promise-enabled object
        let promisifiedObject = q(mockObject);

        // Test successful case
        promisifiedObject.ninvoke('getValue', 'valid')
            .then(function(result) {
                assert.equal(result, 'success_value');
                
                // Test with multiple arguments
                return promisifiedObject.ninvoke('add', 5, 3);
            })
            .then(function(result) {
                assert.equal(result, 8);
                
                // Test error case
                return promisifiedObject.ninvoke('getValue', 'invalid');
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