The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.promised with error callback', function(done) {
        // Create a callback function that fails
        function errorCallback(shouldFail, callback) {
            setTimeout(() => {
                if (shouldFail) {
                    callback(new Error('Test error'));
                } else {
                    callback(null, 'success');
                }
            }, 10);
        }
        
        // Convert to promised version
        const promisedCallback = q.promised(errorCallback);
        
        // Test error case
        promisedCallback(true)
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Test error');
                done();
            });
    });
    
    })
``` 
failed with the following error message:
```
Should have rejected  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.