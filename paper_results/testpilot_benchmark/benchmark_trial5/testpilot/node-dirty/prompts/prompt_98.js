The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', 'test-data');
        
        // Verify the event was handled
        setTimeout(() => {
            assert.strictEqual(eventFired, true, 'Event should have been fired');
            assert.strictEqual(eventData, 'test-data', 'Event data should match');
            done();
        }, 10);
    });
``` 
failed with the following error message:
```
A runnable must be passed a function as its second argument.  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.