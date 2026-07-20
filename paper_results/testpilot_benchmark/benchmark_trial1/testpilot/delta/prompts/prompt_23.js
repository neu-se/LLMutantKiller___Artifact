The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.peek - after next()', function(done) {
        let delta = new quill_delta.Delta([
            { insert: 'First' },
            { insert: 'Second' },
            { insert: 'Third' }
        ]);
        
        let iterator = new quill_delta.OpIterator(delta.ops);
        
        // Advance to next operation
        iterator.next();
        
        // Peek should now return the second operation
        let peeked = iterator.peek();
        assert.deepEqual(peeked, { insert: 'Second' });
        
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