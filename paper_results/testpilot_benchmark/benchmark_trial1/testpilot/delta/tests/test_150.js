let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.slice', function(done) {
        // Test 1: slice() with no parameters (copy entire delta)
        const delta1 = new Delta().insert('Hello', { bold: true }).insert(' World');
        const copy = delta1.slice();
        assert.deepEqual(copy.ops, [
            { insert: 'Hello', attributes: { bold: true } },
            { insert: ' World' }
        ]);
        
        // Test 2: slice(start) - get substring from position 6 to end
        const world = delta1.slice(6);
        assert.deepEqual(world.ops, [{ insert: 'World' }]);
        
        // Test 3: slice(start, end) - get single character at position 5
        const space = delta1.slice(5, 6);
        assert.deepEqual(space.ops, [{ insert: ' ' }]);
        
        // Test 4: slice with start position 0
        const hello = delta1.slice(0, 5);
        assert.deepEqual(hello.ops, [{ insert: 'Hello', attributes: { bold: true } }]);
        
        // Test 5: slice beyond content length
        const empty = delta1.slice(20, 25);
        assert.deepEqual(empty.ops, []);
        
        // Test 6: slice with negative start (should treat as 0)
        const fromStart = delta1.slice(-5, 5);
        assert.deepEqual(fromStart.ops, [{ insert: 'Hello', attributes: { bold: true } }]);
        
        // Test 7: slice with end before start
        const invalid = delta1.slice(8, 6);
        assert.deepEqual(invalid.ops, []);
        
        // Test 8: slice on empty delta
        const emptyDelta = new Delta();
        const emptySlice = emptyDelta.slice(0, 5);
        assert.deepEqual(emptySlice.ops, []);
        
        done();
    });
});