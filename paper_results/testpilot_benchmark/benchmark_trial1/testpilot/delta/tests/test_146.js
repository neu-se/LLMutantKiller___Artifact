let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.slice', function(done) {
        // Test 1: Basic slice with start and end parameters
        let delta1 = new Delta([
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World', attributes: { bold: true } },
            { insert: '!' }
        ]);
        
        let sliced1 = delta1.slice(0, 5);
        assert.deepEqual(sliced1.ops, [{ insert: 'Hello' }]);
        
        // Test 2: Slice with only start parameter
        let sliced2 = delta1.slice(6);
        assert.deepEqual(sliced2.ops, [
            { insert: 'World', attributes: { bold: true } },
            { insert: '!' }
        ]);
        
        // Test 3: Slice with negative start (should be treated as 0)
        let sliced3 = delta1.slice(-1, 5);
        assert.deepEqual(sliced3.ops, [{ insert: 'Hello' }]);
        
        // Test 4: Slice beyond delta length
        let sliced4 = delta1.slice(0, 100);
        assert.deepEqual(sliced4.ops, delta1.ops);
        
        // Test 5: Empty slice (start >= end)
        let sliced5 = delta1.slice(5, 5);
        assert.deepEqual(sliced5.ops, []);
        
        // Test 6: Slice with default parameters (should return copy of entire delta)
        let sliced6 = delta1.slice();
        assert.deepEqual(sliced6.ops, delta1.ops);
        assert.notStrictEqual(sliced6, delta1); // Should be a new instance
        
        // Test 7: Slice across multiple operations
        let sliced7 = delta1.slice(4, 8);
        assert.deepEqual(sliced7.ops, [
            { insert: 'o' },
            { insert: ' ' },
            { insert: 'Wo', attributes: { bold: true } }
        ]);
        
        // Test 8: Empty delta
        let emptyDelta = new Delta();
        let slicedEmpty = emptyDelta.slice(0, 5);
        assert.deepEqual(slicedEmpty.ops, []);
        
        done();
    });
});