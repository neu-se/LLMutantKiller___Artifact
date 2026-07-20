The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set - overwrite existing key', function(done) {
        let promise = q.makePromise();
        
        // Set initial value
        promise.set('overwriteKey', 'initialValue');
        
        // Overwrite with new value
        promise.set('overwriteKey', 'newValue');
        
        // Verify the value was overwritten
        if (typeof promise.get === 'function') {
            assert.strictEqual(promise.get('overwriteKey'), 'newValue');
        }
        
        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:
+ actual - expected

+ Promise {
+   inspect: [Function (anonymous)],
+   promiseDispatch: [Function (anonymous)],
+   valueOf: [Function (anonymous)]
+ }
- 'newValue'  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.