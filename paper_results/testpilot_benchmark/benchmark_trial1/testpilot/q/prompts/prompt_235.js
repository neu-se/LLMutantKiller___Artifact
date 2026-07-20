The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify - passes additional arguments', function(done) {
        // Mock function that expects pre-bound arguments
        function mockAsyncFunction(prefix, data, callback) {
            setTimeout(() => {
                callback(null, `${prefix}: ${data}`);
            }, 10);
        }

        let promise = q.makePromise(function(resolve, reject) {
            resolve(mockAsyncFunction);
        });

        // Test passing additional arguments to denodeify
        let denodeified = promise.denodeify('PREFIX');
        
        denodeified('test data')
            .then(result => {
                assert.strictEqual(result, 'PREFIX: test data');
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