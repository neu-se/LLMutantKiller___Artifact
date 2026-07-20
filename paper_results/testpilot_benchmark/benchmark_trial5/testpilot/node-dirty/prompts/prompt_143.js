The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeAllListeners - remove all listeners without specifying type', function(done) {
        // Create a temporary in-memory database
        let db = dirty();
        
        let callCount = 0;
        let listener = () => { callCount++; };
        
        // Add listeners for different events
        db.on('event1', listener);
        db.on('event2', listener);
        db.on('event3', listener);
        
        // Verify listeners are added
        assert.equal(db.listenerCount('event1'), 1);
        assert.equal(db.listenerCount('event2'), 1);
        assert.equal(db.listenerCount('event3'), 1);
        
        // Remove all listeners for all events
        db.removeAllListeners();
        
        // Verify all listeners are removed
        assert.equal(db.listenerCount('event1'), 0);
        assert.equal(db.listenerCount('event2'), 0);
        assert.equal(db.listenerCount('event3'), 0);
        
        // Emit events to confirm no listeners are called
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_204.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.