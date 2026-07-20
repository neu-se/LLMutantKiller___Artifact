let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeAllListeners', function() {
        
        it('should remove all listeners for a specific event type', function(done) {
            const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({
                name: 'test-emitter'
            });
            
            const listener1 = () => {};
            const listener2 = () => {};
            const listener3 = () => {};
            
            emitter.on('event1', listener1);
            emitter.on('event1', listener2);
            emitter.on('event2', listener3);
            
            // Verify listeners are added
            assert.strictEqual(emitter.listenerCount('event1'), 2);
            assert.strictEqual(emitter.listenerCount('event2'), 1);
            
            // Remove listeners for event1 only
            const result = emitter.removeAllListeners('event1');
            
            // Verify only event1 listeners are removed
            assert.strictEqual(emitter.listenerCount('event1'), 0);
            assert.strictEqual(emitter.listenerCount('event2'), 1);
            assert.strictEqual(result, emitter); // Should return this
            
            done();
        });

    })
})