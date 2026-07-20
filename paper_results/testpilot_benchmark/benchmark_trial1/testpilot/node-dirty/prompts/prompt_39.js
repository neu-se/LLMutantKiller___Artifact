The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', 'test-data');

        // Use setImmediate to ensure event is processed
        setImmediate(() => {
            assert.strictEqual(eventFired, true, 'Event should have been fired');
            assert.strictEqual(eventData, 'test-data', 'Event data should match');
            done();
        });
    });
``` 
failed with the following error message:
```
eventFired is not defined  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.