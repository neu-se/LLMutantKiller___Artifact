let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fcall', function(done) {
        // Test 1: fcall with no arguments
        let addFunction = function(a, b) {
            return (a || 0) + (b || 0);
        };
        
        let promise1 = q.resolve(addFunction);
        
        promise1.fcall().then(function(result) {
            assert.strictEqual(result, 0); // 0 + 0 = 0
            
            // Test 2: fcall with single argument
            return promise1.fcall(5);
        }).then(function(result) {
            assert.strictEqual(result, 5); // 5 + 0 = 5
            
            // Test 3: fcall with multiple arguments
            return promise1.fcall(3, 7);
        }).then(function(result) {
            assert.strictEqual(result, 10); // 3 + 7 = 10
            
            // Test 4: fcall with a function that returns a promise
            let asyncFunction = function(x) {
                return q.resolve(x * 2);
            };
            let promise2 = q.resolve(asyncFunction);
            return promise2.fcall(21);
        }).then(function(result) {
            assert.strictEqual(result, 42);
            
            // Test 5: fcall with a function that throws an error
            let errorFunction = function(msg) {
                throw new Error(msg);
            };
            let promise3 = q.resolve(errorFunction);
            return promise3.fcall("test error").catch(function(err) {
                assert.strictEqual(err.message, "test error");
                return "error handled";
            });
        }).then(function(result) {
            assert.strictEqual(result, "error handled");
            
            // Test 6: fcall on a rejected promise should propagate the rejection
            let rejectedPromise = q.reject(new Error("rejected"));
            return rejectedPromise.fcall(1, 2, 3).catch(function(err) {
                assert.strictEqual(err.message, "rejected");
                return "rejection handled";
            });
        }).then(function(result) {
            assert.strictEqual(result, "rejection handled");
            
            // Test 7: fcall with a function that uses 'this' context
            let contextFunction = function(multiplier) {
                // Since fcall passes 'void 0' (undefined) as context, 'this' will be undefined
                // In non-strict mode, it might be the global object, but we shouldn't rely on 'this'
                return multiplier * 10;
            };
            let promise4 = q.resolve(contextFunction);
            return promise4.fcall(4);
        }).then(function(result) {
            assert.strictEqual(result, 40);
            done();
        }).catch(done);
    });
    
});