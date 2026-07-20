The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - multiple listeners', function(done) {
        let db = dirty();
        
        let listener1Called = false;
        let listener2Called = false;
        
        // Register two different once listeners
        db.once('multi-event', function(data) {
            listener1Called = true;
            assert.strictEqual(data, 'multi-data');
        });
        
        db.once('multi-event', function(data) {
            listener2Called = true;
            assert.strictEqual(data, 'multi-data');
            
            // Check that both listeners were called
            setTimeout(() => {
                assert.strictEqual(listener1Called, true);
                assert.strictEqual(listener2Called, true);
                done();
            }, 10);
        });
        
        // Emit the event once
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_166.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.