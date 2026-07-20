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
        
        // Test 2: slice(start) - get substring from start to end
        const delta2 = new Delta().insert('Hello', { bold: true }).insert(' World');
        const world = delta2.slice(6);
        assert.deepEqual(world.ops, [{ insert: 'World' }]);
        
        // Test 3: slice(start, end) - get substring between start and end
        const delta3 = new Delta().insert('Hello', { bold: true }).insert(' World');
        const space = delta3.slice(5, 6);
        assert.deepEqual(space.ops, [{ insert: ' ' }]);
        
        // Test 4: slice with start = 0
        const delta4 = new Delta().insert('Hello World');
        const hello = delta4.slice(0, 5);
        assert.deepEqual(hello.ops, [{ insert: 'Hello' }]);
        
        // Test 5: slice beyond content length
        const delta5 = new Delta().insert('Test');
        const beyond = delta5.slice(10);
        assert.deepEqual(beyond.ops, []);
        
        // Test 6: slice with negative start (should be treated as 0)
        const delta6 = new Delta().insert('Hello');
        const negative = delta6.slice(-1, 3);
        assert.deepEqual(negative.ops, [{ insert: 'Hel' }]);
        
        // Test 7: slice empty delta
        const emptyDelta = new Delta();
        const emptySlice = emptyDelta.slice(0, 5);
        assert.deepEqual(emptySlice.ops, []);
        
        done();
    });
});