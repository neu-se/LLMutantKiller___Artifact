let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test passByCopy method existence', function(done) {
        // Test that the method exists on the prototype
        let promise = q.makePromise();
        assert.strictEqual(typeof promise.passByCopy, 'function', 'passByCopy should be a function');
        assert(promise.hasOwnProperty('passByCopy') || 'passByCopy' in promise, 'passByCopy should be accessible on promise instance');
        
        done();
    });
});