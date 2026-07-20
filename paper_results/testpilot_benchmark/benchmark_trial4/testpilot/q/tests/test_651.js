let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.get', function(done) {
        // Test getting property from object
        let objectPromise = q.fcall(function() {
            return { foo: "bar", baz: 42 };
        });
        
        objectPromise.get("foo").then(function(value) {
            assert.equal(value, "bar");
            return objectPromise.get("baz");
        }).then(function(value) {
            assert.equal(value, 42);
            done();
        }).catch(done);
    });
});