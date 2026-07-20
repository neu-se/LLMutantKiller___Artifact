The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.on with options parameter', function(done) {
        const emitter = new EventEmitter();
        const testEvent = 'testEventWithOptions';
        const options = { once: true };
        
        // Set up the event listener with options
        dirty.Dirty.on(emitter, testEvent, options);
        
        let callCount = 0;
        emitter.on(testEvent, () => {
            callCount++;
        });
        
        // Emit the event twice
        emitter.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_21.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.