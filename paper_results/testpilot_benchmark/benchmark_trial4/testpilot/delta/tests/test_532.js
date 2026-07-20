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
        
        // Test 4: slice with start position in middle of formatted text
        const hello = delta1.slice(0, 5);
        assert.deepEqual(hello.ops, [{ insert: 'Hello', attributes: { bold: true } }]);
        
        // Test 5: slice with range spanning multiple operations
        const helloSpace = delta1.slice(0, 6);
        assert.deepEqual(helloSpace.ops, [
            { insert: 'Hello', attributes: { bold: true } },
            { insert: ' ' }
        ]);
        
        // Test 6: slice with start beyond content length
        const empty = delta1.slice(20);
        assert.deepEqual(empty.ops, []);
        
        // Test 7: slice with negative start (should be treated as 0)
        const fromStart = delta1.slice(-5, 5);
        assert.deepEqual(fromStart.ops, [{ insert: 'Hello', attributes: { bold: true } }]);
        
        // Test 8: slice with end before start
        const invalid = delta1.slice(10, 5);
        assert.deepEqual(invalid.ops, []);
        
        done();
    });
});