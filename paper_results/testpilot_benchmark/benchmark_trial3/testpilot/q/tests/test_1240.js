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

        // Convert the mock object to a Q promise-enabled object
        let promiseClient = q.makePromise(mockClient, function(name, args) {
            return this[name].apply(this, args);
        });

        // Test successful ninvoke call
        promiseClient.ninvoke("get", "valid:key")
            .then(function(result) {
                assert.equal(result, "success_value");
                
                // Test ninvoke with multiple arguments
                return promiseClient.ninvoke("set", "test:key", "test_value");
            })
            .then(function(result) {
                assert.equal(result, "OK");
                
                // Test ninvoke with error case
                return promiseClient.ninvoke("get", "invalid:key");
            })
            .then(function() {
                // Should not reach here
                assert.fail("Expected error was not thrown");
            })
            .catch(function(error) {
                assert.ok(error instanceof Error);
                assert.equal(error.message, "Key not found");
                done();
            })
            .catch(done);
    });

    })