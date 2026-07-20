let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.post', function(done) {
        // Test 1: Basic method call with arguments
        let testObject = {
            add: function(a, b) {
                return a + b;
            },
            multiply: function(x, y, z) {
                return x * y * z;
            },
            getName: function() {
                return "test";
            }
        };
        
        let promise = q(testObject);
        
        // Test calling add method with arguments [3, 5]
        promise.post("add", [3, 5])
            .then(function(result) {
                assert.equal(result, 8);
                
                // Test calling multiply method with arguments [2, 3, 4]
                return promise.post("multiply", [2, 3, 4]);
            })
            .then(function(result) {
                assert.equal(result, 24);
                
                // Test calling method with no arguments
                return promise.post("getName", []);
            })
            .then(function(result) {
                assert.equal(result, "test");
                
                // Test calling non-existent method should reject
                return promise.post("nonExistentMethod", [1, 2, 3]);
            })
            .then(function(result) {
                // Should not reach here
                assert.fail("Expected promise to reject");
            })
            .catch(function(error) {
                // Expected to catch error for non-existent method
                assert(error instanceof Error);
                done();
            })
            .catch(done);
    });
});