let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.npost - successful method call', function(done) {
        // Create a mock object with a method that follows Node.js callback convention
        let mockObject = {
            testMethod: function(arg1, arg2, callback) {
                // Simulate async operation
                setTimeout(() => {
                    callback(null, arg1 + arg2);
                }, 10);
            }
        };
        
        // Use q.npost to call the method and promisify it
        q.npost(mockObject, 'testMethod', [5, 3])
            .then(function(result) {
                assert.equal(result, 8);
                done();
            })
            .catch(done);
    });
});