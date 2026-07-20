The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - error handling', function(done) {
        let db = dirty();
        
        // Test that errors in the listener don't break the once functionality
        db.once('error-event', function() {
            throw new Error('Test error');
        });
        
        // Add another listener to verify the event still works
        db.once('error-event', function() {
            done();
        });
        
        // Catch the error to prevent test failure
        process.once('uncaughtException', function(err) {
            assert.strictEqual(err.message, 'Test error');
        });
        
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_153.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.