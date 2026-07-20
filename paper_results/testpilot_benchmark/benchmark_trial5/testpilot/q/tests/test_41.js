let mocha = require('mocha');
let assert = require('assert');

describe('test q', function() {
    it('test deep copy with simple object', function(done) {
        let original = { name: 'test', value: 42 };
        // Use JSON.parse(JSON.stringify()) for deep copying simple objects
        let copied = JSON.parse(JSON.stringify(original));
        
        // Should be a deep copy, not the same reference
        assert.notStrictEqual(copied, original);
        
        // Should have the same properties and values
        assert.deepEqual(copied, original);
        
        // Modifying the copy should not affect the original
        copied.name = 'modified';
        assert.equal(original.name, 'test');
        assert.equal(copied.name, 'modified');
        
        done();
    });
});