The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply with error callback', function(done) {
        // Create a mock function that calls callback with error
        function mockAsyncFunctionWithError(arg1, callback) {
            setTimeout(() => {
                callback(new Error('Test error'));
            }, 10);
        }
        
        const promisifiedFunction = q.makePromise(mockAsyncFunctionWithError);
        
        promisifiedFunction.nfapply(['test'])
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
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_261.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.