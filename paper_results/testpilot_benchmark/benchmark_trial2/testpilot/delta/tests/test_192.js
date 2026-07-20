let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transformPosition', function(done) {
        // Test case 1: Position before insertion point remains unchanged
        const delta1 = new Delta().retain(5).insert('a');
        assert.strictEqual(delta1.transformPosition(4), 4);
        
        // Test case 2: Position at insertion point gets shifted
        assert.strictEqual(delta1.transformPosition(5), 6);
        
        // Test case 3: Position after insertion point gets shifted
        assert.strictEqual(delta1.transformPosition(6), 7);
        
        // Test case 4: Multiple insertions
        const delta2 = new Delta().retain(2).insert('hello').retain(3).insert('world');
        assert.strictEqual(delta2.transformPosition(1), 1); // before first insertion
        assert.strictEqual(delta2.transformPosition(2), 7); // at first insertion point
        assert.strictEqual(delta2.transformPosition(5), 15); // at second insertion point
        
        // Test case 5: Deletion operations - Fixed based on actual behavior
        const delta3 = new Delta().retain(3).delete(2).insert('x');
        assert.strictEqual(delta3.transformPosition(2), 2); // before deletion
        assert.strictEqual(delta3.transformPosition(3), 4); // at deletion start (position after deletion + insertion)
        assert.strictEqual(delta3.transformPosition(4), 4); // within deleted range (maps to deletion start + insertion)
        assert.strictEqual(delta3.transformPosition(5), 4); // at deletion end (maps to deletion start + insertion)
        assert.strictEqual(delta3.transformPosition(6), 5); // after deletion and insertion
        
        // Test case 6: Priority parameter with insertion at same position
        const delta4 = new Delta().retain(5).insert('a');
        assert.strictEqual(delta4.transformPosition(5, false), 6); // default priority
        assert.strictEqual(delta4.transformPosition(5, true), 5); // high priority
        
        // Test case 7: Empty delta
        const delta5 = new Delta();
        assert.strictEqual(delta5.transformPosition(5), 5);
        
        // Test case 8: Only retain operations
        const delta6 = new Delta().retain(10);
        assert.strictEqual(delta6.transformPosition(5), 5);
        
        done();
    });
});