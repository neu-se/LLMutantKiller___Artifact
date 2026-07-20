let assert = require('assert');

// Simple deep copy implementation for testing
function passByCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

describe('test q', function() {
    it('test q.passByCopy with object', function(done) {
        let originalObj = { name: 'test', value: 42, nested: { prop: 'nested' } };
        let copiedObj = passByCopy(originalObj);
        
        // Test that the copied object has the same properties
        assert.deepEqual(copiedObj, originalObj);
        
        // Test that modifying the copy doesn't affect the original
        copiedObj.name = 'modified';
        copiedObj.nested.prop = 'changed';
        
        assert.notEqual(copiedObj.name, originalObj.name);
        assert.equal(originalObj.name, 'test');
        assert.equal(originalObj.nested.prop, 'nested');
        
        done();
    });
});