The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.filter - empty result', function(done) {
        let delta = new quill_delta([
            { retain: 5 },
            { insert: 'hello' }
        ]);
        
        // Filter for operations that don't exist
        let filtered = delta.filter(op => op.delete !== undefined);
        
        assert.equal(filtered.ops.length, 0);
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