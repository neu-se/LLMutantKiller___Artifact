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

        it('should work when called multiple times', function(done) {
            let destroyCount = 0;
            
            eventEmitter.on('destroy', function() {
                destroyCount++;
            });

            eventEmitter.emitDestroy();
            eventEmitter.emitDestroy();
            
            setTimeout(function() {
                assert.strictEqual(destroyCount, 2, 'destroy event should be emitted twice');
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