The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.partition with insert operations', function(done) {
        let delta = new quill_delta([
            { insert: 'world' },
            { retain: 10 },
            { insert: 'test' },
            { delete: 5 }
        ]);
        
        let [inserts, others] = delta.partition(op => op.insert);
        
        assert.equal(inserts.ops.length, 2);
        assert.equal(inserts.ops[0].insert, 'world');
        assert.equal(inserts.ops[1].insert, 'test');
        
        assert.equal(others.ops.length, 2);
        assert.equal(others.ops[0].retain, 10);
        assert.equal(others.ops[1].delete, 5);
        
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