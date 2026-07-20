let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.length', function(done) {
        // Test 1: Empty delta should have length 0
        let emptyDelta = new Delta();
        assert.strictEqual(emptyDelta.length(), 0);
        
        // Test 2: Simple insert operation
        let insertDelta = new Delta().insert('Hello');
        assert.strictEqual(insertDelta.length(), 5);
        
        // Test 3: Complex operations with insert, retain, and delete
        let complexDelta = new Delta().insert('A').retain(2).delete(1);
        assert.strictEqual(complexDelta.length(), 4);
        
        // Test 4: Multiple insert operations
        let multiInsertDelta = new Delta().insert('Hello').insert(' World');
        assert.strictEqual(multiInsertDelta.length(), 11);
        
        // Test 5: Only retain operations
        let retainDelta = new Delta().retain(10);
        assert.strictEqual(retainDelta.length(), 10);
        
        // Test 6: Only delete operations
        let deleteDelta = new Delta().delete(5);
        assert.strictEqual(deleteDelta.length(), 5);
        
        // Test 7: Mixed operations
        let mixedDelta = new Delta().insert('ABC').retain(3).delete(2).insert('XY');
        assert.strictEqual(mixedDelta.length(), 10);
        
        // Test 8: Insert with attributes (should still count characters)
        let attributedDelta = new Delta().insert('Bold', { bold: true });
        assert.strictEqual(attributedDelta.length(), 4);
        
        done();
    });
});