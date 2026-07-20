let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with rejected state inspect', function(done) {
        const descriptor = {};
        
        const inspect = function() {
            return {state: "rejected", reason: new Error("test error")};
        };
        
        const promise = q.makePromise(descriptor, undefined, inspect);
        
        // Test that exception property is set for rejected state
        assert(promise.exception instanceof Error);
        assert.equal(promise.exception.message, "test error");
        
        // Test valueOf returns promise itself for rejected state
        assert.equal(promise.valueOf(), promise);
        
        done();
    });
});