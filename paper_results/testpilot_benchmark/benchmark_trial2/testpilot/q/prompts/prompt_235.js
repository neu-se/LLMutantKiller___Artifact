The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfcall with error callback', function(done) {
        // Create a mock function that calls back with an error
        function mockAsyncFunctionWithError(arg, callback) {
            setTimeout(() => {
                callback(new Error('Test error'));
            }, 10);
        }
        
        const promisifiedFn = q.makePromise(mockAsyncFunctionWithError);
        
        promisifiedFn.nfcall('test')
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(err => {
                assert.strictEqual(err.message, 'Test error');
                done();
            });
    });

    })
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_281.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.