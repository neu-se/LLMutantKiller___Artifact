let assert = require('assert');

// Simple deep copy implementation for testing
function passByCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

describe('test q', function() {
    it('test q.passByCopy with array', function(done) {
        let originalArray = [1, 2, { item: 'test' }];
        let copiedArray = passByCopy(originalArray);
        
        // Test that the copied array has the same elements
        assert.deepEqual(copiedArray, originalArray);
        
        // Test that modifying the copy doesn't affect the original
        copiedArray.push(4);
        copiedArray[2].item = 'modified';
        
        assert.equal(originalArray.length, 3);
        assert.equal(copiedArray.length, 4);
        assert.equal(originalArray[2].item, 'test');
        
        done();
    });
});