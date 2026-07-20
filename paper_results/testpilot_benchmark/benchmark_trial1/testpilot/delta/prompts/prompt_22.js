The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.peek - empty delta', function(done) {
        let delta = new quill_delta.Delta([]);
        let iterator = new quill_delta.OpIterator(delta.ops);
        
        // Peek on empty iterator should return undefined or null
        let peeked = iterator.peek();
        assert(peeked === undefined || peeked === null);
        
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