The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fapply with function that throws error', function(done) {
        // Create a function that throws an error
        function throwError() {
            throw new Error('Test error');
        }
        
        let promisedThrow = q.denodeify(throwError);
        
        // Test fapply with error case
        promisedThrow.fapply([])
            .then(function() {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Test error');
                done();
            });
    });

    })
``` 
failed with the following error message:
```
promisedThrow.fapply is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.