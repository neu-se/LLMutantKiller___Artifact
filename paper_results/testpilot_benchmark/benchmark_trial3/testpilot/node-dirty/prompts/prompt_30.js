The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.on with basic event listening', function(done) {
        const emitter = new EventEmitter();
        const testEvent = 'testEvent';
        const testData = { message: 'hello world' };
        
        // Set up the event listener using dirty.Dirty.on
        dirty.Dirty.on(emitter, testEvent);
        
        // Listen for the event to verify it was properly set up
        emitter.on(testEvent, (data) => {
            assert.strictEqual(data.message, testData.message);
            done();
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