The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('EventEmitterAsyncResource.prototype.emitDestroy', function() {
        let db;
        let eventEmitter;

        beforeEach(function() {
            // Create a new dirty database instance for each test
            db = dirty();
            // Access the EventEmitterAsyncResource instance
            eventEmitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
        });

        afterEach(function() {
            if (db) {
                db.close();
            }
        });

        it('should emit destroy event when emitDestroy is called', function(done) {
            let destroyEventFired = false;
            
            eventEmitter.on('destroy', function() {
                destroyEventFired = true;
            });

            eventEmitter.emitDestroy();
            
            // Give some time for async event to fire
            setTimeout(function() {
                assert.strictEqual(destroyEventFired, true, 'destroy event should have been emitted');
                done();
            }, 10);
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