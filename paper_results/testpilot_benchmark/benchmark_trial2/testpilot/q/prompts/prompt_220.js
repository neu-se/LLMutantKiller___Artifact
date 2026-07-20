The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply with empty arguments', function(done) {
        // Create a mock function that takes no arguments except callback
        function mockAsyncFunctionNoArgs(callback) {
            setTimeout(() => {
                callback(null, 'success');
            }, 10);
        }
        
        const promisifiedFunction = q.makePromise(mockAsyncFunctionNoArgs);
        
        promisifiedFunction.nfapply([])
            .then(result => {
                assert.strictEqual(result, 'success');
                done();
            })
            .catch(done);
    });

    })
``` 
failed with the following error message:
```
Function.prototype.apply was called on [object Object], which is an object and not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.