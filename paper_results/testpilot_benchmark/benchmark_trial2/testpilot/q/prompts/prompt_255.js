The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind - basic functionality', function(done) {
        // Create a mock Node.js-style callback function
        function mockAsyncFunction(arg1, arg2, callback) {
            setTimeout(() => {
                callback(null, `result: ${arg1} + ${arg2}`);
            }, 10);
        }
        
        // Create a promise from the function
        let promiseFunc = q.makePromise(mockAsyncFunction);
        
        // Use nbind to bind it with specific arguments
        let boundFunc = promiseFunc.nbind(null, 'hello');
        
        // Test that it returns a promise and works correctly
        boundFunc('world').then(result => {
            assert.equal(result, 'result: hello + world');
            done();
        }).catch(done);
    });

    })
``` 
failed with the following error message:
```
callback.apply is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.