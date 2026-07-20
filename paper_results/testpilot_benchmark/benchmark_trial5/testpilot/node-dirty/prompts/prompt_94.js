The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - with parameters', function(done) {
        let db = dirty();
        
        let receivedArgs = [];
        
        // Register once listener that captures multiple arguments
        db.once('test-event', function(arg1, arg2, arg3) {
            receivedArgs = [arg1, arg2, arg3];
        });
        
        // Emit event with multiple arguments
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_144.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.