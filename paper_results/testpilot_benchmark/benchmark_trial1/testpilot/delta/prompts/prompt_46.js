The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.diff - empty objects', function(done) {
        let result = quill_delta.AttributeMap.diff({}, {});
        assert.deepEqual(result, {});
        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be loosely deep-equal:

undefined

should loosely deep-equal

{}  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.