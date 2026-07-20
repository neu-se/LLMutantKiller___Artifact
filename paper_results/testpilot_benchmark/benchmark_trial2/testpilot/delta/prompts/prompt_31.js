The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.peekType', function(done) {
        // Test with retain operation
        let delta1 = new quill_delta.Delta([{ retain: 5 }]);
        let iter1 = new quill_delta.OpIterator(delta1.ops);
        assert.strictEqual(iter1.peekType(), 'retain');
        
        // Test with insert operation
        let delta2 = new quill_delta.Delta([{ insert: 'hello' }]);
        let iter2 = new quill_delta.OpIterator(delta2.ops);
        assert.strictEqual(iter2.peekType(), 'insert');
        
        // Test with delete operation
        let delta3 = new quill_delta.Delta([{ delete: 3 }]);
        let iter3 = new quill_delta.OpIterator(delta3.ops);
        assert.strictEqual(iter3.peekType(), 'delete');
        
        // Test with multiple operations - should return type of first operation
        let delta4 = new quill_delta.Delta([
            { insert: 'text' },
            { retain: 2 },
            { delete: 1 }
        ]);
        let iter4 = new quill_delta.OpIterator(delta4.ops);
        assert.strictEqual(iter4.peekType(), 'insert');
        
        // Test with empty operations array
        let delta5 = new quill_delta.Delta([]);
        let iter5 = new quill_delta.OpIterator(delta5.ops);
        assert.strictEqual(iter5.peekType(), 'retain');
        
        // Test that peekType doesn't advance the iterator
        let delta6 = new quill_delta.Delta([{ insert: 'test' }, { retain: 1 }]);
        let iter6 = new quill_delta.OpIterator(delta6.ops);
        assert.strictEqual(iter6.peekType(), 'insert');
        assert.strictEqual(iter6.peekType(), 'insert'); // Should still be 'insert'
        
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