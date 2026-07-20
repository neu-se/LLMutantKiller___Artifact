The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply with multiple return values', function(done) {
        // Create a mock function that returns multiple values
        function mockAsyncFunction(callback) {
            setTimeout(() => {
                callback(null, 'first', 'second', 'third');
            }, 10);
        }
        
        const promisifiedFunction = q.makePromise(mockAsyncFunction);
        
        // Test nfapply - should return first non-error argument
        promisifiedFunction.nfapply([])
            .then(result => {
                assert.strictEqual(result, 'first');
                done();
            })
            .catch(done);
    });
});
``` 
failed with the following error message:
```
Function.prototype.apply was called on [object Object], which is an object and not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.