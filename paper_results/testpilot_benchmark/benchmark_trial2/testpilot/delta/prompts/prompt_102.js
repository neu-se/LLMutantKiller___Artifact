The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.map with mixed operations and attributes', function(done) {
        let delta = new quill_delta([
            { insert: 'Bold text', attributes: { bold: true } },
            { retain: 5, attributes: { italic: true } },
            { delete: 3 }
        ]);
        
        let mapped = delta.map(function(op, index) {
            let newOp = Object.assign({}, op);
            newOp.index = index;
            return newOp;
        });
        
        assert.deepEqual(mapped.ops, [
            { insert: 'Bold text', attributes: { bold: true }, index: 0 },
            { retain: 5, attributes: { italic: true }, index: 1 },
            { delete: 3, index: 2 }
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
    attributes: {
      bold: true
    },
    index: 0,
    insert: 'Bold text'
  },
  {
    attributes: {
      italic: true
    },
    index: 1,
    retain: 5
  },
  {
    delete: 3,
    index: 2
  }
]  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.