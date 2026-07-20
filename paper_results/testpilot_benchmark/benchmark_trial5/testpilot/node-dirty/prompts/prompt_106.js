The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependOnceListener - returns emitter', function(done) {
        let db = dirty();
        
        let result = db.prependOnceListener('return-test', function() {
            // Verify the method returns the emitter instance for chaining
            assert.strictEqual(result, db);
            done();
        });
        
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_171.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.