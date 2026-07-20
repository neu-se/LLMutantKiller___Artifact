The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.peekLength', function(done) {
        // Test 1: peekLength with text operation at beginning
        let delta1 = new quill_delta.Delta([
            { insert: 'hello' },
            { insert: 'world' }
        ]);
        let iter1 = new quill_delta.OpIterator(delta1.ops);
        assert.strictEqual(iter1.peekLength(), 5, 'Should return length of first operation');

        // Test 2: peekLength after consuming part of an operation
        iter1.next(2); // consume 2 characters from 'hello'
        assert.strictEqual(iter1.peekLength(), 3, 'Should return remaining length after offset');

        // Test 3: peekLength with retain operation
        let delta2 = new quill_delta.Delta([
            { retain: 10 },
            { insert: 'test' }
        ]);
        let iter2 = new quill_delta.OpIterator(delta2.ops);
        assert.strictEqual(iter2.peekLength(), 10, 'Should return length of retain operation');

        // Test 4: peekLength with delete operation
        let delta3 = new quill_delta.Delta([
            { delete: 7 },
            { insert: 'new' }
        ]);
        let iter3 = new quill_delta.OpIterator(delta3.ops);
        assert.strictEqual(iter3.peekLength(), 7, 'Should return length of delete operation');

        // Test 5: peekLength when iterator is at the end
        let delta4 = new quill_delta.Delta([{ insert: 'end' }]);
        let iter4 = new quill_delta.OpIterator(delta4.ops);
        iter4.next(3); // consume all characters
        assert.strictEqual(iter4.peekLength(), Infinity, 'Should return Infinity when past end of operations');

        // Test 6: peekLength with empty operations array
        let iter5 = new quill_delta.OpIterator([]);
        assert.strictEqual(iter5.peekLength(), Infinity, 'Should return Infinity for empty operations');

        // Test 7: peekLength with mixed operations and partial consumption
        let delta6 = new quill_delta.Delta([
            { insert: 'abc' },
            { retain: 5 },
            { delete: 2 }
        ]);
        let iter6 = new quill_delta.OpIterator(delta6.ops);
        iter6.next(1); // consume 1 character from 'abc'
        assert.strictEqual(iter6.peekLength(), 2, 'Should return remaining length of current operation');
        
        iter6.next(2); // consume remaining 'bc'
        assert.strictEqual(iter6.peekLength(), 5, 'Should return length of next operation (retain)');

        done();
    });
});
``` 
failed with the following error message:
```
quill_delta.Delta is not a constructor  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.