The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeAllListeners - remove listeners for non-existent event', function(done) {
        // Create a temporary in-memory database
        let db = dirty();
        
        let callCount = 0;
        let listener = () => { callCount++; };
        
        // Add listener for one event
        db.on('existingEvent', listener);
        
        // Verify listener is added
        assert.equal(db.listenerCount('existingEvent'), 1);
        
        // Try to remove listeners for non-existent event
        db.removeAllListeners('nonExistentEvent');
        
        // Verify existing listener is not affected
        assert.equal(db.listenerCount('existingEvent'), 1);
        
        // Emit the existing event to confirm listener still works
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_197.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.