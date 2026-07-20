The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - different event types', function(done) {
        let db = dirty();
        
        let event1Fired = false;
        let event2Fired = false;
        
        // Register once listeners for different events
        db.once('event1', function() {
            event1Fired = true;
        });
        
        db.once('event2', function() {
            event2Fired = true;
        });
        
        // Emit only one of the events
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_146.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.