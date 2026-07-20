The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set - should set numeric property', function(done) {
        let obj = {};
        q.set(obj, 'count', 42);
        assert.strictEqual(obj.count, 42);
        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:

undefined !== 42
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.