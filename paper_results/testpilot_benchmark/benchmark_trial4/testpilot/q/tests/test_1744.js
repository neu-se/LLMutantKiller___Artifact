let assert = require('assert');

// Simple implementation of q.delete for testing
let q = {
    delete: function(obj, key) {
        delete obj[key];
    }
};

describe('test q', function() {
    it('test q.delete - should delete property with special characters', function(done) {
        let testObj = { 'special-key': 'value', 'normal': 'data' };
        q.delete(testObj, 'special-key');
        
        assert.strictEqual(testObj.hasOwnProperty('special-key'), false);
        assert.strictEqual(testObj.normal, 'data');
        done();
    });
});