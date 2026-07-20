The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind with simple callback', function(done) {
        // Create a simple node-style callback function
        function nodeStyleFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, arg1 + arg2);
            }, 10);
        }
        
        // Create a promise-returning function using makePromise
        const promiseFunction = q.makePromise(nodeStyleFunction);
        
        // Bind arguments using nbind
        const boundFunction = promiseFunction.nbind(null, 5, 3);
        
        // Test the bound function
        boundFunction()
            .then(result => {
                assert.strictEqual(result, 8);
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