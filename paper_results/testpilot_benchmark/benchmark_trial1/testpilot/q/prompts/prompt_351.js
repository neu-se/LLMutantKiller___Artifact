The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.promised with multiple parameters', function(done) {
        // Create a callback function that takes multiple parameters
        function multiParamCallback(a, b, c, callback) {
            setTimeout(() => {
                callback(null, a + b + c);
            }, 10);
        }
        
        // Convert to promise using q.promised
        const promisedFunction = q.promised(multiParamCallback);
        
        // Test with multiple parameters
        promisedFunction(1, 2, 3)
            .then(result => {
                assert.strictEqual(result, 6);
                done();
            })
            .catch(done);
    });
    
    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:

undefined !== 6
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.