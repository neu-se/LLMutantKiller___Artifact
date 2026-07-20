The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    let db;
    
    beforeEach(function() {
        // Create a new in-memory dirty database for each test
        db = dirty();
    });
    
    afterEach(function() {
        // Clean up after each test
        if (db && typeof db.close === 'function') {
            db.close();
        }
    });

    it('multi-arg-event', 'string', 123, true, { obj: 'value' });
        
        setTimeout(() => {
            assert.strictEqual(receivedArgs.length, 4, 'Should receive 4 arguments');
            assert.strictEqual(receivedArgs[0], 'string');
            assert.strictEqual(receivedArgs[1], 123);
            assert.strictEqual(receivedArgs[2], true);
            assert.deepStrictEqual(receivedArgs[3], { obj: 'value' });
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