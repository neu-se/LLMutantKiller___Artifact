The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('EventEmitterAsyncResource.prototype.emit', function() {
        
        it('should throw error when kAsyncResource is undefined', function() {
            const EventEmitterAsyncResource = dirty.Dirty.EventEmitter.EventEmitterAsyncResource;
            const emitter = Object.create(EventEmitterAsyncResource.prototype);
            
            assert.throws(() => {
                emitter.em})})    })
})
``` 
failed with the following error message:
```
Missing expected exception.  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.