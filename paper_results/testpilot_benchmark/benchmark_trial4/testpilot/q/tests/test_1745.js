let assert = require('assert');

// Mock q object with delete method
let q = {
    delete: function(obj, key) {
        if (key != null && obj != null) {
            delete obj[key];
        }
    }
};

describe('test q', function() {
    it('test q.delete - should handle null/undefined key', function(done) {
        let testObj = { a: 1, b: 2 };
        q.delete(testObj, null);
        q.delete(testObj, undefined);
        
        assert.strictEqual(testObj.a, 1);
        assert.strictEqual(testObj.b, 2);
        done();
    });
});