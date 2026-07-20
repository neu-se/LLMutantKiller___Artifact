The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind with no arguments bound', function(done) {
        // Create a simple function
        function simpleFunction(value, callback) {
            setTimeout(() => {
                callback(null, value * 2);
            }, 10);
        }
        
        // Create a promise-returning function
        const promiseFunction = q.makePromise(simpleFunction);
        
        // Bind with no arguments (just this context)
        const boundFunction = promiseFunction.nbind(null);
        
        // Test with all arguments provided at call time
        boundFunction(7)
            .then(result => {
                assert.strictEqual(result, 14);
                done();
            })
            .catch(done);
    });
});
``` 
failed with the following error message:
```
callback.apply is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.