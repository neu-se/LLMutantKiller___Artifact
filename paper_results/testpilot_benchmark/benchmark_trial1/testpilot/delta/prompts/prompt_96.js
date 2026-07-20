The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.map returns new Delta instance', function(done) {
        let original = new quill_delta([{ insert: 'test' }]);
        
        let mapped = original.map(function(op) {
            return op;
        });
        
        assert.notStrictEqual(original, mapped);
        assert(mapped instanceof quill_delta);
        assert.deepEqual(original.ops, mapped.ops);
        done();
    });
});
``` 
failed with the following error message:
```
The expression evaluated to a falsy value:

  assert(mapped instanceof quill_delta)
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.