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
        if (db && typeof db.close === 'function') {
            db.close();
        }
    });

    it('should handle multiple listeners for same event', function(done) {
        let listener1Called = false;
        let listener2Called = false;
        let callOrder = [];
        
        db.on('shared-event', function() {
            listener1Called = true;
            callOrder.push('listener1');
        });
        
        db.on('shared-event', function() {
            listener2Called = true;
            callOrder.push('listener2');
        });
        
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_210.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.