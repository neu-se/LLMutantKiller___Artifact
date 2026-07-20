The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - no additional arguments', function(done) {
        function simpleFunction() {
            return 'hello world';
        }
        
        let promiseFunction = q.makePromise(simpleFunction);
        let boundFunction = promiseFunction.fbind(null);
        
        boundFunction()
            .then(function(result) {
                assert.equal(result, 'hello world');
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