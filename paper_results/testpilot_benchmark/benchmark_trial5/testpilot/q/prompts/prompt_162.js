The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - with context binding', function(done) {
        let testObject = {
            value: 10,
            multiply: function(a, b) {
                return this.value * a * b;
            }
        };
        
        let promiseFunction = q.makePromise(testObject.multiply);
        let boundFunction = promiseFunction.fbind(testObject, 2);
        
        boundFunction(3)
            .then(function(result) {
                assert.equal(result, 60); // 10 * 2 * 3 = 60
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