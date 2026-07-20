The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeAllListeners - remove all listeners for specific event', function(done) {
        // Create a temporary in-memory database
        let db = dirty();
        
        let callCount = 0;
        let listener1 = () => { callCount++; };
        let listener2 = () => { callCount++; };
        
        // Add multiple listeners for the same event
        db.on('testEvent', listener1);
        db.on('testEvent', listener2);
        
        // Verify listeners are added
        assert.equal(db.listenerCount('testEvent'), 2);
        
        // Remove all listeners for the specific event
        db.removeAllListeners('testEvent');
        
        // Verify all listeners are removed
        assert.equal(db.listenerCount('testEvent'), 0);
        
        // Emit the event to confirm no listeners are called
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_191.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.