The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fapply with function that throws error', function(done) {
        // Create a function that throws an error
        function throwError(message) {
            throw new Error(message);
        }
        
        // Convert it to a promise-returning function
        let promiseThrow = q.makePromise(throwError);
        
        // Test fapply with error case
        promiseThrow.fapply(['test error'])
            .then(function(result) {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'test error');
                done();
            });
    });
    
    })
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_170.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.