The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply - empty arguments', function(done) {
        // Create a mock function that takes no arguments except callback
        function mockAsyncFunctionNoArgs(callback) {
            setTimeout(() => {
                callback(null, 'success');
            }, 10);
        }
        
        // Create a promise from the mock function
        let promisifiedFunction = q.denodeify(mockAsyncFunctionNoArgs);
        
        // Test nfapply with empty arguments array
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
promisifiedFunction.nfapply is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.