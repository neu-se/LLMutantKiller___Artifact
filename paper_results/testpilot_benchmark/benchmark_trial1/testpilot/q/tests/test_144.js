let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.post - successful method call', function(done) {
        // Create a mock object with a method that takes arguments
        let mockObject = {
            calculate: function(a, b, callback) {
                setTimeout(() => {
                    callback(null, a + b);
                }, 10);
            }
        };
        
        // Convert to promise-based object using q.nbind or q.nfcall
        // Use q.npost which is the correct method for calling methods with arguments
        q.npost(mockObject, 'calculate', [5, 3])
            .then(function(result) {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });
});