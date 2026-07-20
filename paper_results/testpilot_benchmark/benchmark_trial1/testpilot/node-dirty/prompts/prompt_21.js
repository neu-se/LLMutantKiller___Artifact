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
    
    it('data-event', { message: 'test data' });
        
        setTimeout(() => {
            assert.deepStrictEqual(eventData, { message: 'test data' }, 'Event data should be preserved');
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