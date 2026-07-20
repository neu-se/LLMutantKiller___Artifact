The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.addListener - multiple listeners', function(done) {
        let db = dirty();
        let eventEmitter = db;
        
        let listener1Called = false;
        let listener2Called = false;
        
        let listener1 = function(data) {
            listener1Called = true;
            assert.equal(data, 'multi-test');
            checkCompletion();
        };
        
        let listener2 = function(data) {
            listener2Called = true;
            assert.equal(data, 'multi-test');
            checkCompletion();
        };
        
        function checkCompletion() {
            if (listener1Called && listener2Called) {
                done();
            }
        }
        
        // Add multiple listeners for the same event
        eventEmitter.addListener('multi-event', listener1);
        eventEmitter.addListener('multi-event', listener2);
        
        // Emit the event
        eventEmitter.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_129.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.