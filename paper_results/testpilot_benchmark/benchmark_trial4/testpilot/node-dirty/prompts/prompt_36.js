The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.on with multiple events', function(done) {
        const emitter = new EventEmitter();
        const event1 = 'event1';
        const event2 = 'event2';
        let eventCount = 0;
        
        dirty.Dirty.on(emitter, event1);
        dirty.Dirty.on(emitter, event2);
        
        const checkComplete = () => {
            eventCount++;
            if (eventCount === 2) {
                done();
            }
        };
        
        emitter.on(event1, checkComplete);
        emitter.on(event2, checkComplete);
        
        emitter.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_21.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.