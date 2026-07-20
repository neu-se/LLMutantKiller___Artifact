The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.transform with basic attributes', function(done) {
        let a = { bold: true, italic: true };
        let b = { underline: true };
        let result = quill_delta.AttributeMap.transform(a, b, false);
        
        // When priority is false, b's attributes should be preserved
        assert.deepEqual(result, { bold: true, italic: true, underline: true });
        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be loosely deep-equal:

{
  underline: true
}

should loosely deep-equal

{
  bold: true,
  italic: true,
  underline: true
}  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.