The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set - should set boolean property', function(done) {
        let obj = {};
        q.set(obj, 'isActive', true);
        assert.strictEqual(obj.isActive, true);
        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:
+ actual - expected

+ undefined
- true  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.