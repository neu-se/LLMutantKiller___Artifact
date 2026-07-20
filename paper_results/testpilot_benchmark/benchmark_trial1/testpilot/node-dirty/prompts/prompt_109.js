The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependOnceListener - prepend order', function(done) {
        let db = dirty();
        let executionOrder = [];
        
        // Add a regular listener first
        db.on('order-test', function() {
            executionOrder.push('regular');
        });
        
        // Add a prependOnceListener - this should execute first
        db.prependOnceListener('order-test', function() {
            executionOrder.push('prepended-once');
        });
        
        // Add another regular listener
        db.on('order-test', function() {
            executionOrder.push('regular2');
            
            // Verify execution order
            assert.deepStrictEqual(executionOrder, ['prepended-once', 'regular', 'regular2']);
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