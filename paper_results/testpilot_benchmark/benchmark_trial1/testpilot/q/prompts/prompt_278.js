The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke with multiple arguments', function(done) {
        const mockObject = {
            calculate: function(a, b, c, callback) {
                setTimeout(() => {
                    callback(null, a + b + c);
                }, 10);
            }
        };

        const promise = q.makePromise(mockObject);
        
        promise.ninvoke('calculate', 1, 2, 3)
            .then(result => {
                assert.strictEqual(result, 6);
                done();
            })
            .catch(done);
    });

    })
``` 
failed with the following error message:
```
Promise does not support operation: post  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.