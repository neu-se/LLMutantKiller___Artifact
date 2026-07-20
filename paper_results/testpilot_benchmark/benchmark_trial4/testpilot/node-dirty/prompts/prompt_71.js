The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init', function() {
        
        it('should initialize _events when _events equals prototype._events', function() {
            const instance = Object.create(dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype);
            const proto = Object.getPrototypeOf(instance);
            proto._events = { test: 'value' };
            instance._events = proto._events;
            
            dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init.call(instance, {});
            
            assert.strictEqual(typeof instance._events, 'object');
            assert.strictEqual(instance._events.__proto__, null);
            assert.strictEqual(instance._eventsCount, 0);
            assert.strictEqual(instance[Symbol.for('kShapeMode')], false);
        });

            })
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