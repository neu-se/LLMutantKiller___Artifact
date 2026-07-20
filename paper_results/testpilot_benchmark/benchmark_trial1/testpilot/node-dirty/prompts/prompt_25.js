The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    let emitter;
    
    beforeEach(function() {
        emitter = new EventEmitter();
    });
    
    it('test dirty.Dirty.on with basic event', function(done) {
        let eventFired = false;
        
        // Set up the event handler
        dirty.Dirty.on(emitter, 'test-event');
        
        // Listen for the event to verify it was handled
        emitter.on('test-event', function() {
            eventFired = true;
        });
        
        // Emit the event
        emitter.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_19.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.