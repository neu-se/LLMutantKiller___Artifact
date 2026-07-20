The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke with synchronous callback', function(done) {
        const mockObject = {
            syncMethod: function(value, callback) {
                // Synchronous callback
                callback(null, value * 2);
            }
        };

        const promise = q.makePromise(mockObject);
        
        promise.ninvoke('syncMethod', 5)
            .then(result => {
                assert.strictEqual(result, 10);
                done();
            })
            .catch(done);
    });
});
``` 
failed with the following error message:
```
Promise does not support operation: post  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.