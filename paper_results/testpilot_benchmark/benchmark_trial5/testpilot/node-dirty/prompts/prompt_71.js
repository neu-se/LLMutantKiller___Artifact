The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.getMaxListeners - default value', function(done) {
        try {
            // Create a new EventEmitterAsyncResource instance
            let emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
            
            // Test that getMaxListeners returns the default value (typically 10)
            let maxListeners = emitter.getMaxListeners();
            assert(typeof maxListeners === 'number', 'getMaxListeners should return a number');
            assert(maxListeners >= 0, 'getMaxListeners should return a non-negative number');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })
``` 
failed with the following error message:
```
The "options.name" property must be of type string. Received undefined  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.