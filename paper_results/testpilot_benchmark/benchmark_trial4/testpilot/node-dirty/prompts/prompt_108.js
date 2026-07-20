The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - with error event', function(done) {
        let db = dirty();
        
        let errorCaught = false;
        
        // Test once with error event
        db.once('error', function(err) {
            errorCaught = true;
            assert(err instanceof Error);
            assert.strictEqual(err.message, 'test error');
            
            setTimeout(() => {
                assert.strictEqual(errorCaught, true);
                done();
            }, 10);
        });
        
        // Emit an error
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_168.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.