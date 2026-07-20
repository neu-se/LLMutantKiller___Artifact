The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fapply with function that returns value', function(done) {
        // Create a simple function that adds two numbers
        function add(a, b) {
            return a + b;
        }
        
        // Create a promise for the function
        let promisedAdd = q.denodeify(add);
        
        // Test fapply with arguments array
        promisedAdd.fapply([5, 3])
            .then(function(result) {
                assert.equal(result, 8);
                done();
            })
            .catch(done);
    });

    })
``` 
failed with the following error message:
```
promisedAdd.fapply is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.