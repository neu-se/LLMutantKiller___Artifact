The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.promised with successful callback', function(done) {
        // Create a simple callback function that succeeds
        function simpleCallback(value, callback) {
            setTimeout(() => {
                callback(null, value * 2);
            }, 10);
        }
        
        // Convert to promised version
        const promisedCallback = q.promised(simpleCallback);
        
        // Test the promised version
        promisedCallback(5)
            .then(result => {
                assert.equal(result, 10);
                done();
            })
            .catch(done);
    });
    
    })
``` 
failed with the following error message:
```
undefined == 10  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.