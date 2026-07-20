The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.filter - basic filtering', function(done) {
        let delta = new quill_delta([
            { retain: 5 },
            { insert: 'hello' },
            { delete: 3 },
            { insert: 'world', attributes: { bold: true } }
        ]);
        
        // Filter only insert operations
        let filtered = delta.filter(op => op.insert !== undefined);
        
        assert.equal(filtered.ops.length, 2);
        assert.equal(filtered.ops[0].insert, 'hello');
        assert.equal(filtered.ops[1].insert, 'world');
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