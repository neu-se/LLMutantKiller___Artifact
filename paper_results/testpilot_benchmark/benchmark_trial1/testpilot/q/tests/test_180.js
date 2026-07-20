let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fcall', function(done) {
        let testCount = 0;
        let totalTests = 6;
        
        function checkDone() {
            testCount++;
            if (testCount === totalTests) {
                done();
            }
        }
        
        // Test 1: fcall with no arguments on a function that returns a value
        let promiseFunc1 = q.resolve(function() {
            return 42;
        });
        
        promiseFunc1.fcall().then(function(result) {
            assert.strictEqual(result, 42);
            checkDone();
        }).catch(done);
        
        // Test 2: fcall with arguments
        let promiseFunc2 = q.resolve(function(a, b) {
            return a + b;
        });
        
        promiseFunc2.fcall(10, 20).then(function(result) {
            assert.strictEqual(result, 30);
            checkDone();
        }).catch(done);
        
        // Test 3: fcall with function that throws an error
        let promiseFunc3 = q.resolve(function() {
            throw new Error("Test error");
        });
        
        promiseFunc3.fcall().then(function(result) {
            done(new Error("Should have thrown"));
        }).catch(function(error) {
            assert.strictEqual(error.message, "Test error");
            checkDone();
        });
        
        // Test 4: fcall with multiple arguments
        let promiseFunc4 = q.resolve(function(x, y, z) {
            return x * y + z;
        });
        
        promiseFunc4.fcall(2, 3, 4).then(function(result) {
            assert.strictEqual(result, 10); // 2 * 3 + 4 = 10
            checkDone();
        }).catch(done);
        
        // Test 5: fcall returning an array
        let promiseFunc5 = q.resolve(function() {
            return [1, 2, 3];
        });
        
        promiseFunc5.fcall().then(function(result) {
            assert.deepStrictEqual(result, [1, 2, 3]);
            checkDone();
        }).catch(done);
        
        // Test 6: fcall with function that returns an object
        let promiseFunc6 = q.resolve(function(name) {
            return { name: name, value: 100 };
        });
        
        promiseFunc6.fcall("test").then(function(result) {
            assert.deepStrictEqual(result, { name: "test", value: 100 });
            checkDone();
        }).catch(done);
    });
    
    })