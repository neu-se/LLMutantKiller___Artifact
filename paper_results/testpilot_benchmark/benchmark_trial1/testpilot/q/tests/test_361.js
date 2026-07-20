let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke', function(done) {
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
            
            add: function(a, b, callback) {
                setTimeout(() => {
                    callback(null, a + b);
                }, 10);
            }
        };

        // Convert to Q promise object
        let promiseObj = q(mockObject);

        // Test successful ninvoke call
        promiseObj.ninvoke('getValue', 'valid')
            .then(result => {
                assert.equal(result, 'success');
                
                // Test ninvoke with multiple arguments
                return promiseObj.ninvoke('add', 5, 3);
            })
            .then(result => {
                assert.equal(result, 8);
                
                // Test ninvoke with error
                return promiseObj.ninvoke('getValue', 'invalid');
            })
            .then(() => {
                // Should not reach here
                assert.fail('Expected error was not thrown');
            })
            .catch(error => {
                assert.equal(error.message, 'Invalid key');
                done();
            })
            .catch(done);
    });

    })