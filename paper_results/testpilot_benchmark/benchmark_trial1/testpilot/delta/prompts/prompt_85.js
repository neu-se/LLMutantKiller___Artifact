The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.filter - filter delete operations', function(done) {
        let delta = new quill_delta([
            { retain: 10 },
            { delete: 5 },
            { insert: 'new text' },
            { delete: 2 }
        ]);
        
        // Filter only delete operations
        let filtered = delta.filter(op => op.delete !== undefined);
        
        assert.equal(filtered.ops.length, 2);
        assert.equal(filtered.ops[0].delete, 5);
        assert.equal(filtered.ops[1].delete, 2);
        done();
    });

    })
``` 
failed with the following error message:
```
Cannot read properties of undefined (reading 'length')  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.