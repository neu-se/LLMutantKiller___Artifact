let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with custom inspect function', function(done) {
        const descriptor = {};
        const fallback = undefined;
        const inspect = function() {
            return {state: 'fulfilled', value: 'inspected value'};
        };
        
        const promise = q.makePromise(descriptor, fallback, inspect);
        
        // Test inspect function
        assert(typeof promise.inspect === 'function');
        const inspected = promise.inspect();
        assert.equal(inspected.state, 'fulfilled');
        assert.equal(inspected.value, 'inspected value');
        
        // Test valueOf
        assert.equal(promise.valueOf(), 'inspected value');
        done();
    });
});