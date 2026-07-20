The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeAllListeners', function() {
        
        it('should handle single function listener', function(done) {
            const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
            
            const listener = () => {};
            emitter.on('test', listener);
            
            assert.strictEqual(emitter.listenerCount('test'), 1);
            
            const result = emitter.removeAllListeners('test');
            
            assert.strictEqual(emitter.listenerCount('test'), 0);
            assert.strictEqual(result, emitter);
            
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