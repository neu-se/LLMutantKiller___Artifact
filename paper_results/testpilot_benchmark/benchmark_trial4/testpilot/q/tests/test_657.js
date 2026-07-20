let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.get', function(done) {
        // Test 1: Get property from a simple object
        let promise1 = q.fcall(function() {
            return { foo: "bar", num: 42 };
        });
        
        promise1.get("foo").then(function(value) {
            assert.equal(value, "bar");
        }).then(function() {
            // Test 2: Get numeric property
            return promise1.get("num");
        }).then(function(value) {
            assert.equal(value, 42);
        }).then(function() {
            // Test 3: Get property from array (using index)
            let arrayPromise = q.fcall(function() {
                return [{ foo: "first" }, { foo: "second" }];
            });
            return arrayPromise.get(0);
        }).then(function(value) {
            assert.deepEqual(value, { foo: "first" });
        }).then(function() {
            // Test 4: Chain get calls (get array element, then property)
            let chainPromise = q.fcall(function() {
                return [{ foo: "bar" }, { foo: "baz" }];
            });
            return chainPromise.get(1).get("foo");
        }).then(function(value) {
            assert.equal(value, "baz");
        }).then(function() {
            // Test 5: Get undefined property
            let objPromise = q.fcall(function() {
                return { existing: "value" };
            });
            return objPromise.get("nonexistent");
        }).then(function(value) {
            assert.equal(value, undefined);
        }).then(function() {
            // Test 6: Get property from nested object
            let nestedPromise = q.fcall(function() {
                return { 
                    level1: { 
                        level2: { 
                            deep: "nested value" 
                        } 
                    } 
                };
            });
            return nestedPromise.get("level1").get("level2").get("deep");
        }).then(function(value) {
            assert.equal(value, "nested value");
        }).then(function() {
            // Test 7: Get from already resolved promise
            let resolvedPromise = q.resolve({ immediate: "value" });
            return resolvedPromise.get("immediate");
        }).then(function(value) {
            assert.equal(value, "value");
            done();
        }).catch(done);
    });
});