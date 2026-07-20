let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.post', function(done) {
        // Test 1: Basic post method call
        let testObject = {
            testMethod: function(arg1, arg2) {
                return arg1 + arg2;
            }
        };
        
        let promise = q(testObject);
        
        promise.post("testMethod", [5, 3])
            .then(function(result) {
                assert.equal(result, 8);
                done();
            })
            .catch(done);
    });
});