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
    
    it('test dirty.Dirty.on with empty options (default)', function(done) {
        let eventData = null;
        
        // Set up the event handler with default options
        dirty.Dirty.on(emitter, 'data-event');
        
        // Listen for the event with data
        emitter.on('data-event', function(data) {
            eventData = data;
        });
        
        // Emit the event with data
        emitter.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_24.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.