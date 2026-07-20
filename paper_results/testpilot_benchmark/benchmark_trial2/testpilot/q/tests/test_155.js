let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.post', function(done) {
        // Test 1: Basic post method call
        let testObject = {
            add: function(a, b) {
                return a + b;
            },
            multiply: function(x, y) {
                return x * y;
            },
            greet: function(name) {
                return "Hello, " + name;
            }
        };
        
        let promise = q(testObject);
        
        // Test calling add method with arguments
        promise.post("add", [5, 3])
            .then(function(result) {
                assert.equal(result, 8, "add method should return 8");
                
                // Test calling multiply method
                return promise.post("multiply", [4, 6]);
            })
            .then(function(result) {
                assert.equal(result, 24, "multiply method should return 24");
                
                // Test calling greet method with string argument
                return promise.post("greet", ["World"]);
            })
            .then(function(result) {
                assert.equal(result, "Hello, World", "greet method should return greeting");
                
                // Test calling method with no arguments
                let objWithNoArgs = {
                    getValue: function() {
                        return 42;
                    }
                };
                let promiseNoArgs = q(objWithNoArgs);
                return promiseNoArgs.post("getValue", []);
            })
            .then(function(result) {
                assert.equal(result, 42, "getValue method should return 42");
                
                // Test calling non-existent method (should reject)
                return promise.post("nonExistentMethod", [])
                    .then(function() {
                        assert.fail("Should have thrown an error for non-existent method");
                    })
                    .catch(function(error) {
                        assert.ok(error, "Should throw error for non-existent method");
                        return "error handled";
                    });
            })
            .then(function() {
                done();
            })
            .catch(function(error) {
                done(error);
            });
    });
    
    })