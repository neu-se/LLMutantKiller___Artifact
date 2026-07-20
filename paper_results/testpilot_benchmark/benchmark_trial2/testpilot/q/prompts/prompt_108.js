The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - with null and undefined values', function(done) {
        let promise = q.makePromise();
        
        // Test setting null and undefined values
        promise.set('nullKey', null);
        promise.set('undefinedKey', undefined);
        
        assert.strictEqual(promise.nullKey, null);
        assert.strictEqual(promise.undefinedKey, undefined);
        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:
+ actual - expected

+ undefined
- null  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.