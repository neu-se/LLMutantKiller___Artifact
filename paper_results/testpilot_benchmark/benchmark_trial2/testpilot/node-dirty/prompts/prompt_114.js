The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeAllListeners', function() {
        
        it('should handle removing listeners for non-existent event type', function(done) {
            const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
            const listener = () => {};
            
            emitter.on('existingEvent', listener);
            
            const result = emitter.removeAllListeners('nonExistentEvent');
            
            assert.strictEqual(result, emitter); // should return this
            assert.strictEqual(emitter.listenerCount('existingEvent'), 1); // should remain
            
            done();
        });
        
            })
})
``` 
failed with the following error message:
```
The "options.name" property must be of type string. Received undefined  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.