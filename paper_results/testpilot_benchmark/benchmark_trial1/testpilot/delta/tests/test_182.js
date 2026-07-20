let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transformPosition', function(done) {
        // Test 1: Empty delta - position should remain unchanged
        let delta1 = new quill_delta();
        assert.equal(delta1.transformPosition(5), 5);
        assert.equal(delta1.transformPosition(0), 0);

        // Test 2: Delta with only retain operations - position should remain unchanged
        let delta2 = new quill_delta().retain(10);
        assert.equal(delta2.transformPosition(5), 5);
        assert.equal(delta2.transformPosition(15), 15);

        // Test 3: Delta with insert operations - position should be shifted forward
        let delta3 = new quill_delta().insert('hello');
        assert.equal(delta3.transformPosition(0), 5); // Insert at beginning shifts position
        assert.equal(delta3.transformPosition(5), 10); // Insert before position shifts it

        // Test 4: Delta with delete operations - position should be shifted backward
        let delta4 = new quill_delta().delete(3);
        assert.equal(delta4.transformPosition(5), 2); // Delete before position shifts it back
        assert.equal(delta4.transformPosition(2), 0); // Delete at position moves it to start of deletion

        // Test 5: Complex delta with multiple operations
        let delta5 = new quill_delta()
            .retain(2)
            .insert('abc')
            .delete(1)
            .retain(3);
        assert.equal(delta5.transformPosition(1), 1); // Before insert, unchanged
        assert.equal(delta5.transformPosition(2), 5); // At insert position, shifted by insert length
        assert.equal(delta5.transformPosition(4), 6); // After insert and delete

        // Test 6: Priority parameter testing
        let delta6 = new quill_delta().insert('test');
        assert.equal(delta6.transformPosition(0, false), 4); // Without priority, insert shifts position
        assert.equal(delta6.transformPosition(0, true), 0); // With priority, position at insert point unchanged

        // Test 7: Insert at exact position with priority
        let delta7 = new quill_delta().retain(5).insert('xyz');
        assert.equal(delta7.transformPosition(5, false), 8); // Without priority, shifted
        assert.equal(delta7.transformPosition(5, true), 5); // With priority, not shifted

        // Test 8: Multiple deletes
        let delta8 = new quill_delta().delete(2).delete(3);
        assert.equal(delta8.transformPosition(10), 5); // Position shifted back by total deletions

        // Test 9: Mixed operations with priority
        let delta9 = new quill_delta()
            .retain(1)
            .insert('a')
            .retain(1)
            .insert('b')
            .delete(1);
        assert.equal(delta9.transformPosition(1, false), 2); // Insert shifts position
        assert.equal(delta9.transformPosition(1, true), 1); // Priority keeps position

        done();
    });
});