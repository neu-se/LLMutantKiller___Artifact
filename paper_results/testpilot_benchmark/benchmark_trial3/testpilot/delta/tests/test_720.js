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
        
        // Test case 3: Insert at beginning
        const delta2 = new quill_delta().insert('hello');
        assert.strictEqual(delta2.transformPosition(0), 5, 'Position at start should be shifted by insert length');
        assert.strictEqual(delta2.transformPosition(3), 8, 'Any position should be shifted by insert length when inserting at start');
        
        // Test case 4: Multiple operations
        const delta3 = new quill_delta().retain(2).insert('ab').retain(3).insert('cd');
        assert.strictEqual(delta3.transformPosition(1), 1, 'Position before first insert should remain unchanged');
        assert.strictEqual(delta3.transformPosition(2), 4, 'Position at first insert should be shifted by first insert length');
        assert.strictEqual(delta3.transformPosition(5), 9, 'Position at second insert should be shifted by both inserts');
        
        // Test case 5: Delete operation
        const delta4 = new quill_delta().retain(3).delete(2);
        assert.strictEqual(delta4.transformPosition(2), 2, 'Position before delete should remain unchanged');
        assert.strictEqual(delta4.transformPosition(3), 3, 'Position at delete start should remain at delete start');
        assert.strictEqual(delta4.transformPosition(4), 3, 'Position within deleted range should move to delete start');
        assert.strictEqual(delta4.transformPosition(6), 4, 'Position after delete should be shifted back by delete length');
        
        // Test case 6: Priority parameter with insert
        const delta5 = new quill_delta().retain(5).insert('x');
        assert.strictEqual(delta5.transformPosition(5, false), 6, 'Without priority, position at insert moves after');
        assert.strictEqual(delta5.transformPosition(5, true), 5, 'With priority, position at insert stays before');
        
        // Test case 7: Empty delta
        const delta6 = new quill_delta();
        assert.strictEqual(delta6.transformPosition(5), 5, 'Empty delta should not change position');
        
        // Test case 8: Only retain operations
        const delta7 = new quill_delta().retain(10);
        assert.strictEqual(delta7.transformPosition(5), 5, 'Only retain operations should not change position');
        
        done();
    });
});