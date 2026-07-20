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
        
        // Test 6: Slice with default parameters
        let delta2 = new Delta([{ insert: 'Test' }]);
        let sliced6 = delta2.slice();
        assert.deepEqual(sliced6.ops, [{ insert: 'Test' }]);
        
        // Test 7: Slice across multiple operations
        let delta3 = new Delta([
            { insert: 'ABC' },
            { insert: 'DEF', attributes: { italic: true } },
            { insert: 'GHI' }
        ]);
        let sliced7 = delta3.slice(2, 7);
        assert.deepEqual(sliced7.ops, [
            { insert: 'C' },
            { insert: 'DEF', attributes: { italic: true } },
            { insert: 'G' }
        ]);
        
        // Test 8: Empty delta
        let delta4 = new Delta();
        let sliced8 = delta4.slice(0, 5);
        assert.deepEqual(sliced8.ops, []);
        
        done();
    });
});