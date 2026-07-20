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
        
        // Use Q's nfcall to promisify the method call
        q.nfcall(mockObject.testMethod.bind(mockObject), 5, 3)
            .then(result => {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });
});