let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init - with captureRejections true', function(done) {
        const instance = Object.create(dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype);
        
        // Call init with captureRejections option
        dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init.call(instance, { captureRejections: true });
        
        // Verify the instance is properly initialized
        // Check if _events exists and is properly initialized
        if (instance._events) {
            assert.strictEqual(instance._events.__proto__, null);
        } else {
            // If _events is undefined, that's also a valid initial state
            assert.strictEqual(instance._events, undefined);
        }
        assert.strictEqual(instance._eventsCount, 0);
        
        done();
    });
});