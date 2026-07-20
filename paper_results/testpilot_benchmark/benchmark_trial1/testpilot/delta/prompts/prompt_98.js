The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.map with empty delta', function(done) {
        let delta = new quill_delta([]);
        
        let mapped = delta.map(function(op) {
            return { insert: 'should not be called' };
        });
        
        assert.deepEqual(mapped.ops, []);
        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be loosely deep-equal:

undefined

should loosely deep-equal

[]  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.