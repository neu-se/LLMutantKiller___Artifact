The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - multiple listeners', function(done) {
        let db = dirty();
        
        let firstListenerCalled = false;
        let secondListenerCalled = false;
        
        // Register two once listeners for the same event
        db.once('multi-test', function(data) {
            firstListenerCalled = true;
            assert.strictEqual(data, 'multi-data');
        });
        
        db.once('multi-test', function(data) {
            secondListenerCalled = true;
            assert.strictEqual(data, 'multi-data');
            
            // Check that both listeners were called
            setTimeout(() => {
                assert.strictEqual(firstListenerCalled, true);
                assert.strictEqual(secondListenerCalled, true);
                done();
            }, 10);
        });
        
        // Emit the event once
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_151.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.