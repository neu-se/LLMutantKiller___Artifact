The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set - should overwrite existing property', function(done) {
        let obj = { name: 'Old Name' };
        q.set(obj, 'name', 'New Name');
        assert.strictEqual(obj.name, 'New Name');
        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:
+ actual - expected

+ 'Old Name'
- 'New Name'  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.