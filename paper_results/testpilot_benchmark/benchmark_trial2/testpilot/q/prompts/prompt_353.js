The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.promised with synchronous callback', function(done) {
        // Create a synchronous callback
        function syncCallback(value, callback) {
            callback(null, value.toUpperCase());
        }
        
        // Convert to promised version
        const promisedCallback = q.promised(syncCallback);
        
        // Test synchronous execution
        promisedCallback('hello')
            .then(result => {
                assert.strictEqual(result, 'HELLO');
                done();
            })
            .catch(done);
    });
});
``` 
failed with the following error message:
```
callback is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.