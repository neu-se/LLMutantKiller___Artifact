The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - partial argument binding', function(done) {
        function asyncMultiply(a, b, c, callback) {
            setTimeout(() => {
                callback(null, a * b * c);
            }, 10);
        }
        
        let promiseMultiply = q.makePromise(asyncMultiply);
        let partiallyBound = promiseMultiply.fbind(2, 3);
        
        partiallyBound(4).then(result => {
            assert.equal(result, 24);
            done();
        }).catch(done);
    });
    
    })
``` 
failed with the following error message:
```
Function.prototype.apply was called on [object Object], which is an object and not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.