The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify - multiple arguments', function(done) {
        // Create a function that takes multiple arguments
        function nodeStyleFunction(a, b, c, callback) {
            setTimeout(() => {
                callback(null, a + b + c);
            }, 10);
        }

        const promise = q.makePromise(() => {});
        const denodeified = promise.denodeify(nodeStyleFunction);
        
        denodeified(1, 2, 3).then(result => {
            assert.strictEqual(result, 6);
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