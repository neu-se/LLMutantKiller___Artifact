The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind with partial argument binding', function(done) {
        // Function that takes multiple arguments
        function multiArgFunction(a, b, c, callback) {
            setTimeout(() => {
                callback(null, a + b + c);
            }, 10);
        }
        
        const promiseFunction = q.makePromise(multiArgFunction);
        
        // Bind first two arguments
        const partiallyBound = promiseFunction.nbind(null, 1, 2);
        
        // Call with remaining argument
        partiallyBound(3)
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
callback.apply is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.