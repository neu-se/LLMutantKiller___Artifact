The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfcall - multiple arguments', function(done) {
        // Mock function that takes multiple arguments plus callback
        function mockMultiArgFunction(a, b, c, d, callback) {
            setTimeout(() => {
                callback(null, [a, b, c, d]);
            }, 10);
        }
        
        let promise = q.makePromise(mockMultiArgFunction, this);
        
        promise.nfcall('arg1', 'arg2', 'arg3', 'arg4')
            .then(result => {
                assert.deepStrictEqual(result, ['arg1', 'arg2', 'arg3', 'arg4']);
                done();
            })
            .catch(done);
    });

    })
``` 
failed with the following error message:
```
Function.prototype.apply was called on [object Object], which is an object and not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.