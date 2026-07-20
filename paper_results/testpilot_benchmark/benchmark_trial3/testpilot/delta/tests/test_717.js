let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transformPosition', function(done) {
        // Test case 1: Basic retain and insert operations
        const delta1 = new quill_delta().retain(5).insert('a');
        assert.equal(delta1.transformPosition(4), 4, 'Position before insert should remain unchanged');
        assert.equal(delta1.transformPosition(5), 6, 'Position at insert should be shifted by insert length');
        assert.equal(delta1.transformPosition(6), 7, 'Position after insert should be shifted by insert length');

        // Test case 2: Delete operations
        const delta2 = new quill_delta().retain(3).delete(2).retain(5);
        assert.equal(delta2.transformPosition(2), 2, 'Position before delete should remain unchanged');
        assert.equal(delta2.transformPosition(4), 3, 'Position within delete range should be adjusted');
        assert.equal(delta2.transformPosition(6), 4, 'Position after delete should be shifted back');

        // Test case 3: Insert at beginning
        const delta3 = new quill_delta().insert('hello');
        assert.equal(delta3.transformPosition(0), 5, 'Position at start should be shifted by insert length');
        assert.equal(delta3.transformPosition(3), 8, 'Any position should be shifted by insert length');

        // Test case 4: Priority parameter with insert
        const delta4 = new quill_delta().retain(3).insert('x');
        assert.equal(delta4.transformPosition(3, false), 4, 'Without priority, position at insert should be shifted');
        assert.equal(delta4.transformPosition(3, true), 3, 'With priority, position at insert should not be shifted');

        // Test case 5: Multiple operations
        const delta5 = new quill_delta().retain(2).insert('ab').delete(1).retain(3);
        assert.equal(delta5.transformPosition(1), 1, 'Position before operations should remain unchanged');
        assert.equal(delta5.transformPosition(2), 4, 'Position at insert should be shifted by insert length');
        assert.equal(delta5.transformPosition(4), 5, 'Position after delete should account for both insert and delete');

        // Test case 6: Empty delta
        const delta6 = new quill_delta();
        assert.equal(delta6.transformPosition(5), 5, 'Empty delta should not change position');

        // Test case 7: Position at zero
        const delta7 = new quill_delta().insert('start');
        assert.equal(delta7.transformPosition(0), 5, 'Position 0 with insert should be shifted');

        done();
    });
});