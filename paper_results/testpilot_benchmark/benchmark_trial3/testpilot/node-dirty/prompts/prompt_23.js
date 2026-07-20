The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.on with multiple events on same emitter', function(done) {
        const emitter = new EventEmitter();
        const event1 = 'event1';
        const event2 = 'event2';
        let receivedEvents = [];
        
        // Set up multiple event listeners
        dirty.Dirty.on(emitter, event1);
        dirty.Dirty.on(emitter, event2);
        
        emitter.on(event1, () => {
            receivedEvents.push('event1');
        });
        
        emitter.on(event2, () => {
            receivedEvents.push('event2');
            // Check that both events were received
            assert.deepStrictEqual(receivedEvents, ['event1', 'event2']);
            done();
        });
        
        // Emit both events
        emitter.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_26.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.