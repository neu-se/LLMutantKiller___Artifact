let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke', function(done) {
        // Create a mock object with a Node.js-style callback method
        let mockClient = {
            get: function(key, callback) {
                // Simulate async operation
                setTimeout(() => {
                    if (key === "valid:key") {
                        callback(null, "success_value");
                    } else {
                        callback(new Error("Key not found"));
                    }
                }, 10);
            },
            
            set: function(key, value, callback) {
                setTimeout(() => {
                    callback(null, "OK");
                }, 10);
            }
        };

        // Test successful ninvoke call using Q.ninvoke
        q.ninvoke(mockClient, "get", "valid:key")
            .then(function(result) {
                assert.equal(result, "success_value");
                
                // Test ninvoke with multiple arguments
                return q.ninvoke(mockClient, "set", "test:key", "test_value");
            })
            .then(function(result) {
                assert.equal(result, "OK");
                
                // Test ninvoke with error case
                return q.ninvoke(mockClient, "get", "invalid:key");
            })
            .then(function() {
                // Should not reach here
                assert.fail("Expected error was not thrown");
            })
            .catch(function(error) {
                assert(error instanceof Error);
                assert.equal(error.message, "Key not found");
                done();
            })
            .catch(done);
    });
});