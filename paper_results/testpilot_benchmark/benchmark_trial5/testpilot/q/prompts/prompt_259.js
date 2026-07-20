The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind with error handling', function(done) {
        // Create a function that returns an error
        function errorFunction(shouldError, callback) {
            setTimeout(() => {
                if (shouldError) {
                    callback(new Error('Test error'));
                } else {
                    callback(null, 'success');
                }
            }, 10);
        }
        
        const promiseFunction = q.makePromise(errorFunction);
        const boundErrorFunction = promiseFunction.nbind(null, true);
        
        boundErrorFunction()
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Test error');
                done();
            });
    });

    })
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_314.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.