The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.peek - at end of operations', function(done) {
        let delta = new quill_delta.Delta([
            { insert: 'Only one' }
        ]);
        
        let iterator = new quill_delta.OpIterator(delta.ops);
        
        // Advance past the only operation
        iterator.next();
        
        // Peek should return undefined/null when at end
        let peeked = iterator.peek();
        assert.ok(peeked === undefined || peeked === null);
        
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