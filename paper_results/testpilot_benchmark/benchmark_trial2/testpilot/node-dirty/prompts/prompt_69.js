The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.addListener - basic functionality', function(done) {
        // Create a temporary in-memory dirty database
        let db = dirty();
        let eventEmitter = db;
        
        let callCount = 0;
        let testListener = function(data) {
            callCount++;
            assert.equal(data, 'test-data');
            if (callCount === 1) {
                done();
            }
        };
        
        // Test addListener method
        eventEmitter.addListener('test-event', testListener);
        
        // Emit the event to verify listener was added
        eventEmitter.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_100.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.