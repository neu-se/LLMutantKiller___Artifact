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
    
    it('should delete multiple keys sequentially', function(done) {
        promiseObj.delete('key1')
            .then(function(result1) {
                assert.strictEqual(result1, true, 'First delete should succeed');
                return promiseObj.delete('key2');
            })
            .then(function(result2) {
                assert.strictEqual(result2, true, 'Second delete should succeed');
                return promiseObj.delete('key1'); // Try to delete already deleted key
            })
            .then(function(result3) {
                assert.strictEqual(result3, false, 'Delete of already deleted key should return false');
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