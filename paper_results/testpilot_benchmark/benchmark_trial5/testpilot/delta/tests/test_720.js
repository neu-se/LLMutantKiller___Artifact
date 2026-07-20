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
        
        // Test case 5: Deletions
        const delta3 = new Delta().retain(3).delete(2).retain(5);
        assert.strictEqual(delta3.transformPosition(2), 2); // before deletion
        assert.strictEqual(delta3.transformPosition(3), 3); // at deletion start
        assert.strictEqual(delta3.transformPosition(4), 3); // within deletion range
        assert.strictEqual(delta3.transformPosition(5), 3); // at deletion end
        assert.strictEqual(delta3.transformPosition(6), 4); // after deletion
        
        // Test case 6: Priority parameter with insertion
        const delta4 = new Delta().retain(5).insert('test');
        assert.strictEqual(delta4.transformPosition(5, false), 9); // default priority
        assert.strictEqual(delta4.transformPosition(5, true), 5); // high priority
        
        // Test case 7: Empty delta
        const delta5 = new Delta();
        assert.strictEqual(delta5.transformPosition(5), 5);
        
        // Test case 8: Only retains
        const delta6 = new Delta().retain(10);
        assert.strictEqual(delta6.transformPosition(5), 5);
        
        done();
    });
});