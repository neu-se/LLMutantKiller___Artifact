The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependOnceListener - multiple prepended listeners', function(done) {
        let db = dirty();
        
        let executionOrder = [];
        
        let listener1 = function() {
            executionOrder.push('first');
        };
        
        let listener2 = function() {
            executionOrder.push('second');
        };
        
        let listener3 = function() {
            executionOrder.push('third');
            
            // Verify execution order: last prepended should be first
            assert.deepStrictEqual(executionOrder, ['third', 'second', 'first']);
            
            // Emit again to verify once listeners don't fire again
            db.em}    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_187.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.