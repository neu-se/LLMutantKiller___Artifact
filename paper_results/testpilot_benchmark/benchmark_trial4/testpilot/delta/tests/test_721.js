let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transformPosition', function(done) {
        // Test case 1: Basic insert operation from the example
        const delta1 = new quill_delta().retain(5).insert('a');
        assert.strictEqual(delta1.transformPosition(4), 4, 'Position before insert should remain unchanged');
        assert.strictEqual(delta1.transformPosition(5), 6, 'Position at insert point should be shifted by insert length');
        
        // Test case 2: Position after insert point
        assert.strictEqual(delta1.transformPosition(6), 7, 'Position after insert should be shifted by insert length');
        
        // Test case 3: Insert multiple characters
        const delta2 = new quill_delta().retain(3).insert('hello');
        assert.strictEqual(delta2.transformPosition(2), 2, 'Position before multi-char insert should remain unchanged');
        assert.strictEqual(delta2.transformPosition(3), 8, 'Position at multi-char insert point should be shifted by insert length');
        assert.strictEqual(delta2.transformPosition(5), 10, 'Position after multi-char insert should be shifted by insert length');
        
        // Test case 4: Delete operation
        const delta3 = new quill_delta().retain(2).delete(3);
        assert.strictEqual(delta3.transformPosition(1), 1, 'Position before delete should remain unchanged');
        assert.strictEqual(delta3.transformPosition(2), 2, 'Position at delete start should remain at delete start');
        assert.strictEqual(delta3.transformPosition(4), 2, 'Position within deleted range should move to delete start');
        assert.strictEqual(delta3.transformPosition(6), 3, 'Position after delete should be shifted back by delete length');
        
        // Test case 5: Priority parameter with insert
        const delta4 = new quill_delta().retain(5).insert('x');
        assert.strictEqual(delta4.transformPosition(5, false), 6, 'Without priority, position at insert moves after');
        assert.strictEqual(delta4.transformPosition(5, true), 5, 'With priority, position at insert stays before');
        
        // Test case 6: Multiple operations
        const delta5 = new quill_delta().retain(2).insert('ab').retain(3).delete(2);
        assert.strictEqual(delta5.transformPosition(1), 1, 'Position before all operations unchanged');
        assert.strictEqual(delta5.transformPosition(2), 4, 'Position at first insert shifted by insert length');
        assert.strictEqual(delta5.transformPosition(6), 6, 'Position at delete start after insert adjustment');
        assert.strictEqual(delta5.transformPosition(8), 6, 'Position after delete shifted back');
        
        // Test case 7: Edge case - position 0
        const delta6 = new quill_delta().insert('start');
        assert.strictEqual(delta6.transformPosition(0), 5, 'Position 0 with insert at beginning');
        
        done();
    });
});