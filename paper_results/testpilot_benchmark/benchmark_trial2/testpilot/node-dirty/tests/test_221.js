let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.emitDestroy', function() {
        
        it('should emit destroy event when emitDestroy is called', function(done) {
            // Create a dirty database instance
            let db = dirty();
            
            // Access the EventEmitterAsyncResource instance
            let asyncResource = db.EventEmitter.EventEmitterAsyncResource.prototype;
            
            // Create a test instance
            let testInstance = Object.create(asyncResource);
            testInstance.asyncId = 1;
            testInstance.destroyed = false;
            
            // Mock the destroy event listener
            testInstance.on = function(event, callback) {
                if (event === 'destroy') {
                    // Simulate async destroy event
                    setImmediate(() => {
                        callback();
                        done();
                    });
                }
            };
            
            // Call emitDestroy
            testInstance.emitDestroy();
        });

            })
})