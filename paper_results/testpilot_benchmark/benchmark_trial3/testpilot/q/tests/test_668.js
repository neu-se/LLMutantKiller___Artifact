let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.get', function(done) {
        // Test 1: Get property from a resolved promise containing an object
        let promise1 = q.resolve({ foo: "bar", baz: 42 });
        promise1.get("foo").then(function(value) {
            assert.equal(value, "bar");
        }).then(function() {
            // Test 2: Get numeric property (array index)
            let promise2 = q.resolve([{ foo: "first" }, { foo: "second" }]);
            return promise2.get(0);
        }).then(function(value) {
            assert.deepEqual(value, { foo: "first" });
        }).then(function() {
            // Test 3: Chain get calls to access nested properties
            let promise3 = q.resolve([{ foo: "bar" }, { foo: "baz" }]);
            return promise3.get(1).get("foo");
        }).then(function(value) {
            assert.equal(value, "baz");
        }).then(function() {
            // Test 4: Get property that doesn't exist (should return undefined)
            let promise4 = q.resolve({ existing: "value" });
            return promise4.get("nonexistent");
        }).then(function(value) {
            assert.equal(value, undefined);
        }).then(function() {
            // Test 5: Get property from a promise that resolves later
            let deferred = q.defer();
            let promise5 = deferred.promise;
            
            // Set up the get operation before resolving
            let getPromise = promise5.get("delayed");
            
            // Resolve the promise after a short delay
            setTimeout(function() {
                deferred.resolve({ delayed: "success" });
            }, 10);
            
            return getPromise;
        }).then(function(value) {
            assert.equal(value, "success");
        }).then(function() {
            // Test 6: Get from nested object structure
            let promise6 = q.resolve({
                user: {
                    name: "John",
                    details: {
                        age: 30,
                        city: "New York"
                    }
                }
            });
            return promise6.get("user");
        }).then(function(user) {
            assert.equal(user.name, "John");
            assert.equal(user.details.age, 30);
        }).then(function() {
            // Test 7: Using fcall with get (similar to usage example #3)
            return q.fcall(function() {
                return [{ foo: "bar" }, { foo: "baz" }];
            }).get(0).get("foo");
        }).then(function(value) {
            assert.equal(value, "bar");
            done();
        }).catch(done);
    });
});