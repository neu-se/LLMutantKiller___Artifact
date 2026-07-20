The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.peek - basic functionality', function(done) {
        // Create a delta with some operations
        let delta = new quill_delta.Delta([
            { insert: 'Hello' },
            { insert: ' ', attributes: { bold: true } },
            { insert: 'World' }
        ]);
        
        let iterator = new quill_delta.OpIterator(delta.ops);
        
        // Peek should return the first operation without advancing
        let peeked = iterator.peek();
        assert.deepEqual(peeked, { insert: 'Hello' });
        
        // Peek again should return the same operation
        let peekedAgain = iterator.peek();
        assert.deepEqual(peekedAgain, { insert: 'Hello' });
        
        done();
    });

    })
``` 
failed with the following error message:
```
quill_delta.Delta is not a constructor  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.