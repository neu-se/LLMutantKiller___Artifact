The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.on with options parameter', function(done) {
        const emitter = new EventEmitter();
        const eventName = 'testEventWithOptions';
        const options = { once: true };
        
        dirty.Dirty.on(emitter, eventName, options);
        
        let callCount = 0;
        emitter.on(eventName, () => {
            callCount++;
        });
        
        // Emit twice but should only be handled once if options.once works
        emitter.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_24.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.