The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    let promiseObj;
    
    beforeEach(function() {
        // Create a fresh promise object for each test
        promiseObj = q.makePromise({
            key1: 'value1',
            key2: 'value2',
            key3: 'value3'
        });
    });
    
    it('should delete an existing key successfully', function(done) {
        promiseObj.delete('key1')
            .then(function(result) {
                assert.strictEqual(result, true, 'Delete should return true for existing key');
                // Verify the key is actually deleted
                return promiseObj.get('key1');
            })
            .then(function(value) {
                assert.strictEqual(value, undefined, 'Deleted key should return undefined');
                done();
            })
            .catch(done);
    });
    
    })
``` 
failed with the following error message:
```
Promise does not support operation: delete  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.