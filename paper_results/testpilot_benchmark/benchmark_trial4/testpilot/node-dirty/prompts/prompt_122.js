The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependOnceListener - prepend order', function(done) {
        let db = dirty();
        
        let executionOrder = [];
        
        let listener1 = function() {
            executionOrder.push('listener1');
        };
        
        let listener2 = function() {
            executionOrder.push('listener2');
            
            // Verify that prependOnceListener was executed first
            assert.deepStrictEqual(executionOrder, ['listener2', 'listener1']);
            done();
        };
        
        // Add first listener
        db.on('order-test', listener1);
        
        // Prepend second listener (should execute first)
        db.prependOnceListener('order-test', listener2);
        
        // Emit the event
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_185.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.