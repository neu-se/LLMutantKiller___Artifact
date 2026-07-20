The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.partition with all matching operations', function(done) {
        let delta = new quill_delta([
            { insert: 'hello' },
            { insert: ' ' },
            { insert: 'world' }
        ]);
        
        let [matching, nonMatching] = delta.partition(op => op.insert);
        
        assert.equal(matching.ops.length, 3);
        assert.equal(nonMatching.ops.length, 0);
        
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