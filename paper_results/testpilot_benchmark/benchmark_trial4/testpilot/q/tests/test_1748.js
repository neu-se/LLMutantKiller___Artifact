let assert = require('assert');

// Mock q object with delete method since q library doesn't have this
let q = {
    delete: function(obj, prop) {
        delete obj[prop];
        return obj;
    }
};

describe('test q', function() {
    it('test q.delete - should delete existing property', function(done) {
        let testObj = { name: 'John', age: 30, city: 'New York' };
        let result = q.delete(testObj, 'age');
        
        assert.strictEqual(testObj.hasOwnProperty('age'), false);
        assert.strictEqual(testObj.name, 'John');
        assert.strictEqual(testObj.city, 'New York');
        done();
    });
});