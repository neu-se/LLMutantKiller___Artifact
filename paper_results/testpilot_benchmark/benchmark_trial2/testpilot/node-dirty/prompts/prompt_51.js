The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init - basic initialization', function(done) {
        // Create a new instance to test
        const instance = Object.create(dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype);
        
        // Call init without options
        dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init.call(instance);
        
        // Verify basic initialization
        assert.strictEqual(typeof instance._events, 'object');
        assert.strictEqual(instance._events.__proto__, null);
        assert.strictEqual(instance._eventsCount, 0);
        assert.strictEqual(instance._maxListeners, undefined);
        
        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:
+ actual - expected

+ undefined
- null  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.