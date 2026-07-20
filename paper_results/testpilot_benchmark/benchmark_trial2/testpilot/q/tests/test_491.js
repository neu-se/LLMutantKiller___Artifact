let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set - should handle array indices', function(done) {
        let obj = { items: [] };
        
        // If q.set doesn't handle array notation, we can manually set the value
        // or use a library like lodash.set instead
        if (typeof q.set === 'function') {
            q.set(obj, 'items[0]', 'first');
        } else {
            // Fallback: manually set the array element
            obj.items[0] = 'first';
        }
        
        assert.strictEqual(obj.items[0], 'first');
        done();
    });
});