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
            { insert: ' ' },
            { insert: 'World' }
        ]);
        
        let sliced2 = delta2.slice(6);
        assert.deepEqual(sliced2.ops, [{ insert: 'World' }]);
        
        // Test 3: Slice middle portion
        let delta3 = new quill_delta([
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World' },
            { insert: '!' }
        ]);
        
        let sliced3 = delta3.slice(5, 11);
        assert.deepEqual(sliced3.ops, [{ insert: ' ' }, { insert: 'World' }]);
        
        // Test 4: Slice with no parameters (should return copy of entire delta)
        let delta4 = new quill_delta([
            { insert: 'Test' }
        ]);
        
        let sliced4 = delta4.slice();
        assert.deepEqual(sliced4.ops, [{ insert: 'Test' }]);
        
        // Test 5: Slice beyond bounds
        let delta5 = new quill_delta([
            { insert: 'Short' }
        ]);
        
        let sliced5 = delta5.slice(10, 20);
        assert.deepEqual(sliced5.ops, []);
        
        // Test 6: Slice with start greater than end
        let delta6 = new quill_delta([
            { insert: 'Hello World' }
        ]);
        
        let sliced6 = delta6.slice(5, 3);
        assert.deepEqual(sliced6.ops, []);
        
        // Test 7: Empty delta
        let delta7 = new quill_delta([]);
        let sliced7 = delta7.slice(0, 5);
        assert.deepEqual(sliced7.ops, []);
        
        // Test 8: Slice with operations that have attributes
        let delta8 = new quill_delta([
            { insert: 'Hello', attributes: { bold: true } },
            { insert: ' World' }
        ]);
        
        let sliced8 = delta8.slice(0, 5);
        assert.deepEqual(sliced8.ops, [{ insert: 'Hello', attributes: { bold: true } }]);
        
        done();
    });
});