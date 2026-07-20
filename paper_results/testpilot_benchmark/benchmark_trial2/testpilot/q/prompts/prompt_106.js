The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - with special characters in key', function(done) {
        let promise = q.makePromise();
        
        // Test keys with special characters
        promise.set('key-with-dashes', 'value1');
        promise.set('key_with_underscores', 'value2');
        promise.set('key.with.dots', 'value3');
        
        assert.strictEqual(promise['key-with-dashes'], 'value1');
        assert.strictEqual(promise['key_with_underscores'], 'value2');
        assert.strictEqual(promise['key.with.dots'], 'value3');
        done();
    });
});
``` 
failed with the following error message:
```
Expected values to be strictly equal:
+ actual - expected

+ undefined
- 'value1'  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.