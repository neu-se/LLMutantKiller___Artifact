The test:
```
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
        
        // Test 2: Slice with only start parameter
        let sliced2 = delta1.slice(6);
        assert.deepEqual(sliced2.ops, [{ insert: 'World' }]);
        
        // Test 3: Slice with start > 0 and specific end
        let sliced3 = delta1.slice(2, 8);
        assert.deepEqual(sliced3.ops, [
            { insert: 'llo' },
            { insert: ' ' }
        ]);
        
        // Test 4: Default parameters (slice entire delta)
        let sliced4 = delta1.slice();
        assert.deepEqual(sliced4.ops, delta1.ops);
        
        // Test 5: Empty delta
        let emptyDelta = new quill_delta([]);
        let slicedEmpty = emptyDelta.slice(0, 5);
        assert.deepEqual(slicedEmpty.ops, []);
        
        // Test 6: Start equals end
        let sliced5 = delta1.slice(3, 3);
        assert.deepEqual(sliced5.ops, []);
        
        // Test 7: Start greater than delta length
        let sliced6 = delta1.slice(20, 25);
        assert.deepEqual(sliced6.ops, []);
        
        // Test 8: Complex delta with formatting operations
        let delta2 = new quill_delta([
            { insert: 'Hello', attributes: { bold: true } },
            { insert: ' World', attributes: { italic: true } },
            { insert: '!' }
        ]);
        
        let sliced7 = delta2.slice(3, 9);
        assert.deepEqual(sliced7.ops, [
            { insert: 'lo', attributes: { bold: true } },
            { insert: ' Wo', attributes: { italic: true } }
        ]);
        
        // Test 9: Slice beyond delta length
        let sliced8 = delta1.slice(0, 100);
        assert.deepEqual(sliced8.ops, delta1.ops);
        
        done();
    });
});
``` 
failed with the following error message:
```
Expected values to be loosely deep-equal:

[
  {
    insert: 'llo'
  },
  {
    insert: ' '
  },
  {
    insert: 'Wo'
  }
]

should loosely deep-equal

[
  {
    insert: 'llo'
  },
  {
    insert: ' '
  }
]  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.