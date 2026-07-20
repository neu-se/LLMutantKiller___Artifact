let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke - successful callback', function(done) {
        // Create a mock object with a method that follows Node.js callback convention
        const mockObject = {
            testMethod: function(arg1, arg2, callback) {
                // Simulate async operation
                setTimeout(() => {
                    callback(null, arg1 + arg2);
                }, 10);
            }
        };

        // Create a promise from the mock object
        const promise = q(mockObject);
        
        // Test ninvoke with the method
        promise.ninvoke('testMethod', 5, 3)
            .then(result => {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });

    })