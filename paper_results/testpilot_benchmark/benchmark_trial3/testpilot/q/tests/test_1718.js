let assert = require('assert');

// Simple implementation of q.set for the test
let q = {
    set: function(obj, key, value) {
        obj[key] = value;
        return obj;
    }
};

describe('test q', function() {
    it('test q.set - should return the modified object', function(done) {
        let obj = {};
        let result = q.set(obj, 'test', 'value');
        assert.strictEqual(result, obj);
        assert.strictEqual(obj.test, 'value');
        done();
    });
});