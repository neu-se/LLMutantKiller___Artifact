The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.concat - basic concatenation', function(done) {
        let delta1 = new quill_delta([
            { insert: 'Hello' }
        ]);
        let delta2 = new quill_delta([
            { insert: ' World' }
        ]);
        
        let result = delta1.concat(delta2);
        
        assert.equal(result.ops.length, 2);
        assert.equal(result.ops[0].insert, 'Hello');
        assert.equal(result.ops[1].insert, ' World');
        done();
    });

    })
``` 
failed with the following error message:
```
1 == 2  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.