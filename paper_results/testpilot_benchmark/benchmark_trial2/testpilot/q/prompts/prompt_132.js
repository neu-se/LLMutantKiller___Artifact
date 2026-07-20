The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.invoke - method that returns a promise', function(done) {
        let testObj = {
            asyncAdd: function(a, b) {
                return q.resolve(a + b);
            }
        };
        
        let promise = q.makePromise(testObj);
        
        promise.invoke('asyncAdd', 10, 20)
            .then(function(result) {
                assert.equal(result, 30);
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