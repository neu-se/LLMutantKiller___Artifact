The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.on without options parameter', function(done) {
        const emitter = new EventEmitter();
        const eventName = 'testEventNoOptions';
        
        // Test without options parameter (should use kEmptyObject default)
        dirty.Dirty.on(emitter, eventName);
        
        emitter.on(eventName, () => {
            assert(true); // Just verify the event was handled
            done();
        });
        
        emitter.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_29.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.