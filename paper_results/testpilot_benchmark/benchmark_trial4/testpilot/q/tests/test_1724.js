let assert = require('assert');

// Simple implementation of q.set function
let q = {
    set: function(obj, key, value) {
        obj[key] = value;
    }
};

describe('test q', function() {
    it('test q.set - should handle null and undefined values', function(done) {
        let obj = {};
        q.set(obj, 'nullValue', null);
        q.set(obj, 'undefinedValue', undefined);
        assert.strictEqual(obj.nullValue, null);
        assert.strictEqual(obj.undefinedValue, undefined);
        done();
    });
});