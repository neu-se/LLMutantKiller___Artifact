let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.slice', function(done) {
        // Test 1: Basic slice with start and end parameters
        let delta1 = new quill_delta([
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World' }
        ]);
        
        let sliced1 = delta1.slice(0, 5);
        assert.deepEqual(sliced1.ops, [{ insert: 'Hello' }]);
        
        // Test 2: Slice with only start parameter (end defaults to Infinity)
        let delta2 = new quill_delta([
            { insert: 'Hello' },
            { insert: ' World' }
        ]);
        
        let sliced2 = delta2.slice(6);
        assert.deepEqual(sliced2.ops, [{ insert: 'World' }]);
        
        // Test 3: Slice with no parameters (should return full delta)
        let delta3 = new quill_delta([
            { insert: 'Test' },
            { insert: 'ing' }
        ]);
        
        let sliced3 = delta3.slice();
        assert.deepEqual(sliced3.ops, delta3.ops);
        
        // Test 4: Slice middle portion
        let delta4 = new quill_delta([
            { insert: 'Hello' },
            { insert: ' Beautiful' },
            { insert: ' World' }
        ]);
        
        let sliced4 = delta4.slice(5, 15);
        assert.deepEqual(sliced4.ops, [{ insert: ' Beautiful' }]);
        
        // Test 5: Slice with start beyond content length
        let delta5 = new quill_delta([
            { insert: 'Short' }
        ]);
        
        let sliced5 = delta5.slice(10, 20);
        assert.deepEqual(sliced5.ops, []);
        
        // Test 6: Slice with end before start (should return empty)
        let delta6 = new quill_delta([
            { insert: 'Content' }
        ]);
        
        let sliced6 = delta6.slice(5, 3);
        assert.deepEqual(sliced6.ops, []);
        
        // Test 7: Slice empty delta
        let delta7 = new quill_delta([]);
        let sliced7 = delta7.slice(0, 5);
        assert.deepEqual(sliced7.ops, []);
        
        // Test 8: Slice with operations that have attributes
        let delta8 = new quill_delta([
            { insert: 'Bold', attributes: { bold: true } },
            { insert: ' Normal' },
            { insert: ' Italic', attributes: { italic: true } }
        ]);
        
        let sliced8 = delta8.slice(4, 11);
        assert.deepEqual(sliced8.ops, [{ insert: ' Normal' }]);
        
        done();
    });
});