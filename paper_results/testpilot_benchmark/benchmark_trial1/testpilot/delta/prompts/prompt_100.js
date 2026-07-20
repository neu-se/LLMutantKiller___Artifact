The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.map with delete operations', function(done) {
        let delta = new quill_delta([
            { insert: 'Keep this' },
            { delete: 5 },
            { insert: 'and this' }
        ]);
        
        let mapped = delta.map(function(op) {
            if (op.delete) {
                return { delete: op.delete + 1 };
            }
            return op;
        });
        
        assert.deepEqual(mapped.ops, [
            { insert: 'Keep this' },
            { delete: 6 },
            { insert: 'and this' }
        ]);
        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be loosely deep-equal:

undefined

should loosely deep-equal

[
  {
    insert: 'Keep this'
  },
  {
    delete: 6
  },
  {
    insert: 'and this'
  }
]  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.