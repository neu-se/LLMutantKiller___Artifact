The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - basic functionality', function(done) {
        // Create a simple async function that takes arguments
        function asyncAdd(a, b, callback) {
            setTimeout(() => {
                callback(null, a + b);
            }, 10);
        }
        
        // Convert to promise and bind arguments
        let promiseAdd = q.makePromise(asyncAdd);
        let boundAdd = promiseAdd.fbind(5, 3);
        
        boundAdd().then(result => {
            assert.equal(result, 8);
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