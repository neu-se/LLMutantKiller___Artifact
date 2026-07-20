let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.setMaxListeners', function() {
        
        it('should set default max listeners when no event targets provided', function(done) {
            const originalDefault = dirty.Dirty.EventEmitter.EventEmitterAsyncResource.defaultMaxListeners;
            
            try {
                // Test setting default max listeners
                dirty.Dirty.EventEmitter.EventEmitterAsyncResource.setMaxListeners(15);
                
                // Verify the default was changed by creating a new EventEmitter and checking its max listeners
                const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({ name: 'test-emitter' });
                assert.strictEqual(emitter.getMaxListeners(), 15);
                
                done();
            } catch (error) {
                done(error);
            } finally {
                // Restore original default
                dirty.Dirty.EventEmitter.EventEmitterAsyncResource.setMaxListeners(originalDefault);
            }
        });

    })
})