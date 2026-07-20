The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set - should handle array indices', function(done) {
        let obj = { items: [] };
        q.set(obj, 'items[0]', 'first');
        assert.strictEqual(obj.items[0], 'first');
        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:
+ actual - expected

+ undefined
- 'first'  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.