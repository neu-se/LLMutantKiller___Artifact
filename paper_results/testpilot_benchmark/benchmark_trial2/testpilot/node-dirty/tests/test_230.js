let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let { EventEmitterAsyncResource } = require('events');

describe('test dirty', function() {
    describe('EventEmitterAsyncResource.prototype.emitDestroy', function() {
        
        it('should not emit destroy event if already destroyed', function(done) {
            // Create a test instance of EventEmitterAsyncResource
            let testInstance = new EventEmitterAsyncResource({ name: 'test' });
            
            // Mark as already destroyed
            testInstance.destroyed = true;
            
            let destroyEventCalled = false;
            
            // Override the emit method to track if destroy event is emitted
            let originalEmit = testInstance.emit;
            testInstance.emit = function(event, ...args) {
                if (event === 'destroy') {
                    destroyEventCalled = true;
                }
                return originalEmit.call(this, event, ...args);
            };
            
            testInstance.emitDestroy();
            
            // Give some time to ensure event is not emitted
            setTimeout(() => {
                assert.strictEqual(destroyEventCalled, false, 'Destroy event should not be emitted for already destroyed resource');
                done();
            }, 10);
        });
    });
});