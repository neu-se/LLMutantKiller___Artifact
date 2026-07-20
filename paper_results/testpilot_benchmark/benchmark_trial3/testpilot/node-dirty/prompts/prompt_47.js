The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource', function() {
        
        it('should create instance with default options', function(done) {
            try {
                const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
                assert(emitter instanceof dirty.Dirty.EventEmitter.EventEmitterAsyncResource);
                assert(typeof emitter.asyncId === 'number');
                assert(typeof emitter.triggerAsyncId === 'number');
                done();
            } catch (error) {
                done(error);
            }
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