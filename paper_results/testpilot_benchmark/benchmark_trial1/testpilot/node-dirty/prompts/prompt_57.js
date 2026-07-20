The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init', function() {
        
        it('should set kShapeMode to true when _events already exists and differs from prototype', function() {
            const instance = Object.create(dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype);
            instance._events = { existing: 'events' };
            
            dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init.call(instance);
            
            assert.strictEqual(instance[Symbol.for('kShapeMode')], true);
            assert.deepStrictEqual(instance._events, { existing: 'events' });
        });

            })
})
``` 
failed with the following error message:
```
Expected values to be strictly equal:
+ actual - expected

+ undefined
- true  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.