let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.npost', function(done) {
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

        // Convert the object to use promises using Q.nfbind or Q.denodeify
        let promisifiedObject = {
            npost: function(methodName, args) {
                return q.npost(mockObject, methodName, args);
            }
        };

        // Test successful case
        promisifiedObject.npost('getValue', ['valid'])
            .then(result => {
                assert.equal(result, 'success');
                
                // Test with multiple arguments
                return promisifiedObject.npost('addNumbers', [5, 3]);
            })
            .then(result => {
                assert.equal(result, 8);
                
                // Test error case
                return promisifiedObject.npost('getValue', ['invalid']);
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