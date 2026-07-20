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
        
        let sliced1 = delta1.slice(1, 3);
        assert.equal(sliced1.ops.length, 2);
        assert.equal(sliced1.ops[0].insert, 'ello');
        assert.equal(sliced1.ops[1].insert, ' ');
        
        // Test 2: Slice with only start parameter (end defaults to Infinity)
        let delta2 = new Delta([
            { insert: 'Hello World' },
            { insert: '\n', attributes: { header: 1 } }
        ]);
        
        let sliced2 = delta2.slice(6);
        assert.equal(sliced2.ops[0].insert, 'World');
        assert.equal(sliced2.ops[1].insert, '\n');
        assert.deepEqual(sliced2.ops[1].attributes, { header: 1 });
        
        // Test 3: Slice with no parameters (defaults: start=0, end=Infinity)
        let delta3 = new Delta([
            { insert: 'Test' },
            { retain: 5 },
            { delete: 2 }
        ]);
        
        let sliced3 = delta3.slice();
        assert.deepEqual(sliced3.ops, delta3.ops);
        
        // Test 4: Slice that spans across multiple operations
        let delta4 = new Delta([
            { insert: 'ABC' },
            { insert: 'DEF', attributes: { italic: true } },
            { insert: 'GHI' }
        ]);
        
        let sliced4 = delta4.slice(2, 7);
        assert.equal(sliced4.ops.length, 3);
        assert.equal(sliced4.ops[0].insert, 'C');
        assert.equal(sliced4.ops[1].insert, 'DEF');
        assert.deepEqual(sliced4.ops[1].attributes, { italic: true });
        assert.equal(sliced4.ops[2].insert, 'G');
        
        // Test 5: Slice with start greater than content length
        let delta5 = new Delta([{ insert: 'Short' }]);
        let sliced5 = delta5.slice(10, 15);
        assert.equal(sliced5.ops.length, 0);
        
        // Test 6: Slice with negative start (should be treated as 0)
        let delta6 = new Delta([{ insert: 'Hello' }]);
        let sliced6 = delta6.slice(-2, 3);
        assert.equal(sliced6.ops[0].insert, 'Hel');
        
        // Test 7: Empty delta slice
        let delta7 = new Delta();
        let sliced7 = delta7.slice(0, 5);
        assert.equal(sliced7.ops.length, 0);
        
        done();
    });
});