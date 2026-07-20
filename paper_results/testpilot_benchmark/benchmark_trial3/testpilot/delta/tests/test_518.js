let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.slice', function(done) {
        // Test 1: Basic slice without parameters (copy entire delta)
        const delta1 = new quill_delta().insert('Hello', { bold: true }).insert(' World');
        const copy = delta1.slice();
        assert.deepEqual(copy.ops, [
            { insert: 'Hello', attributes: { bold: true } },
            { insert: ' World' }
        ]);

        // Test 2: Slice from a specific start position to end
        const world = delta1.slice(6);
        assert.deepEqual(world.ops, [{ insert: 'World' }]);

        // Test 3: Slice with both start and end parameters
        const space = delta1.slice(5, 6);
        assert.deepEqual(space.ops, [{ insert: ' ' }]);

        // Test 4: Slice from beginning with end parameter
        const hello = delta1.slice(0, 5);
        assert.deepEqual(hello.ops, [{ insert: 'Hello', attributes: { bold: true } }]);

        // Test 5: Slice with start position in middle of text
        const ello = delta1.slice(1, 5);
        assert.deepEqual(ello.ops, [{ insert: 'ello', attributes: { bold: true } }]);

        // Test 6: Empty slice (start equals end)
        const empty = delta1.slice(3, 3);
        assert.deepEqual(empty.ops, []);

        // Test 7: Slice beyond delta length
        const beyond = delta1.slice(5, 100);
        assert.deepEqual(beyond.ops, [{ insert: ' World' }]);

        // Test 8: Slice with negative start (should default to 0)
        const fromStart = delta1.slice(-5, 5);
        assert.deepEqual(fromStart.ops, [{ insert: 'Hello', attributes: { bold: true } }]);

        // Test 9: Empty delta slice
        const emptyDelta = new quill_delta();
        const emptySlice = emptyDelta.slice(0, 5);
        assert.deepEqual(emptySlice.ops, []);

        // Test 10: Single character slice
        const singleChar = delta1.slice(0, 1);
        assert.deepEqual(singleChar.ops, [{ insert: 'H', attributes: { bold: true } }]);

        done();
    });
});