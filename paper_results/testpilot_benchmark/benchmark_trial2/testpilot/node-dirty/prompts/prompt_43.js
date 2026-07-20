The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.setMaxListeners with negative value throws error', function(done) {
        try {
            const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
            
            // Attempt to set negative max listeners should throw an error
            assert.throws(() => {
                emitter.setMaxListeners(-1);
            }, /out of range/);
            
            done();
        } catch (error) {
            done(error);
        }
    });
});
``` 
failed with the following error message:
```
The "options.name" property must be of type string. Received undefined  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.