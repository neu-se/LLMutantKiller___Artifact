let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.delete - should handle non-existent property', function(done) {
        let testObj = { name: 'Alice', age: 25 };
        let result = q.delete(testObj, 'nonExistent');
        
        assert.strictEqual(testObj.name, 'Alice');
        assert.strictEqual(testObj.age, 25);
        assert.strictEqual(Object.keys(testObj).length, 2);
        done();
    });
});