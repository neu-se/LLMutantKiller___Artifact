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

    it('should handle multiple listeners for same event', function(done) {
        let listener1Called = false;
        let listener2Called = false;
        let callCount = 0;
        
        db.on('shared-event', function() {
            listener1Called = true;
            callCount++;
        });
        
        db.on('shared-event', function() {
            listener2Called = true;
            callCount++;
        });
        
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_226.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.