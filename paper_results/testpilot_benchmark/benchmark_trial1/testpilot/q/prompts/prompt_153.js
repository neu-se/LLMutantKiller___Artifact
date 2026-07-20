The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - error handling', function(done) {
        function errorFunction(shouldThrow) {
            if (shouldThrow) {
                throw new Error('Test error');
            }
            return 'success';
        }
        
        let promiseFunction = q.makePromise(errorFunction);
        let boundFunction = promiseFunction.fbind(null, true);
        
        boundFunction()
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
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_188.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.