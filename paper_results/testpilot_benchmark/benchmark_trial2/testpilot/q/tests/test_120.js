let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.get', function(done) {
        // Test 1: Get property from a resolved promise containing an object
        let promise1 = q.fcall(function() {
            return { foo: "bar", baz: 42 };
        });
        
        promise1.get("foo").then(function(value) {
            assert.equal(value, "bar");
        }).catch(done);

        // Test 2: Get property from a resolved promise containing an array
        let promise2 = q.fcall(function() {
            return [{ foo: "first" }, { foo: "second" }];
        });
        
        promise2.get(0).then(function(value) {
            assert.deepEqual(value, { foo: "first" });
        }).catch(done);

        // Test 3: Chain get calls to access nested properties
        let promise3 = q.fcall(function() {
            return [{ foo: "bar" }, { foo: "baz" }];
        });
        
        promise3.get(1).get("foo").then(function(value) {
            assert.equal(value, "baz");
        }).catch(done);

        // Test 4: Get undefined property
        let promise4 = q.fcall(function() {
            return { existing: "value" };
        });
        
        promise4.get("nonexistent").then(function(value) {
            assert.equal(value, undefined);
        }).catch(done);

        // Test 5: Get property from a delayed promise
        let promise5 = q.delay(10).then(function() {
            return { delayed: "success" };
        });
        
        promise5.get("delayed").then(function(value) {
            assert.equal(value, "success");
            done(); // Call done after the last async test
        }).catch(done);
    });

    })