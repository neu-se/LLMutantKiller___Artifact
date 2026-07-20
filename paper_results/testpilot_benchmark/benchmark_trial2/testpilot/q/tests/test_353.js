let mocha = require('mocha');
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

        // Convert the object methods to use promises using Q.nbind
        let promisifiedGetValue = q.nbind(mockObject.getValue, mockObject);
        let promisifiedAddNumbers = q.nbind(mockObject.addNumbers, mockObject);

        // Test successful case
        promisifiedGetValue('valid')
            .then(result => {
                assert.equal(result, 'success');
                
                // Test with multiple arguments
                return promisifiedAddNumbers(5, 3);
            })
            .then(result => {
                assert.equal(result, 8);
                
                // Test error case
                return promisifiedGetValue('invalid');
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