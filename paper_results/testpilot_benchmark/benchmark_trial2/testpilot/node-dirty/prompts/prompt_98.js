The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependOnceListener - basic functionality', function(done) {
        // Create a temporary in-memory database
        let db = dirty();
        
        let callCount = 0;
        let listener = function(data) {
            callCount++;
            assert.strictEqual(data, 'test-data');
            
            // Verify the listener was called only once
            assert.strictEqual(callCount, 1);
            
            // Emit the same event again to verify it doesn't trigger
            db.em}    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_133.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.