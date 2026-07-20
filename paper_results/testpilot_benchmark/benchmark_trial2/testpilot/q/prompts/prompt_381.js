The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set - should overwrite existing property', function(done) {
        let obj = { age: 25 };
        q.set(obj, 'age', 30);
        assert.strictEqual(obj.age, 30);
        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:

25 !== 30
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.