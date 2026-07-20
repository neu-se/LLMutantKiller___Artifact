The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - return value', function(done) {
        let db = dirty();
        
        // Test that once returns the EventEmitter instance for chaining
        let result = db.once('chain-event', function() {
            assert.strictEqual(result, db);
            done();
        });
        
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_151.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.