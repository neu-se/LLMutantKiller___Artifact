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
    
    it('test dirty.Dirty.on with options object', function(done) {
        let options = { once: true, priority: 'high' };
        let eventCount = 0;
        
        // Set up the event handler with options
        dirty.Dirty.on(emitter, 'test-event-with-options', options);
        
        // Listen for the event
        emitter.on('test-event-with-options', function() {
            eventCount++;
        });
        
        // Emit the event multiple times
        emitter.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_21.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.