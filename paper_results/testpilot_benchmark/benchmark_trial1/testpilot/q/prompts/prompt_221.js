The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfcall', function(done) {
        // Create a mock Node.js-style async function that succeeds
        function mockAsyncSuccess(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, `success: ${arg1} ${arg2}`);
            }, 10);
        }

        // Create a promise from the mock function
        let promise = q.nfcall(mockAsyncSuccess, "hello", "world");
        
        // Test that nfcall returns a promise and resolves correctly
        promise.nfcall("test", "args")
            .then(result => {
                assert.strictEqual(result, "success: test args");
                done();
            })
            .catch(done);
    });

    })
``` 
failed with the following error message:
```
value.apply is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.