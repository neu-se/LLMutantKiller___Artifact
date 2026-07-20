let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeAllListeners', function() {
        
        it('should handle removing listeners when removeListener event has listeners', function(done) {
            const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({
                name: 'test-emitter'
            });
            
            let removeListenerCalled = 0;
            const removeListenerHandler = () => {
                removeListenerCalled++;
            };
            
            const listener1 = () => {};
            const listener2 = () => {};
            
            emitter.on('removeListener', removeListenerHandler);
            emitter.on('test', listener1);
            emitter.on('test', listener2);
            
            // Remove all listeners for 'test' event
            emitter.removeAllListeners('test');
            
            // Should have called removeListener handler twice (once for each listener)
            assert.strictEqual(removeListenerCalled, 2);
            assert.strictEqual(emitter.listenerCount('test'), 0);
            
            done();
        });

    })
})