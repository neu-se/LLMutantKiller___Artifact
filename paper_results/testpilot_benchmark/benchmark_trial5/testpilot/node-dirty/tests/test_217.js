let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeAllListeners', function() {
        
        it('should emit removeListener events when removeListener is registered', function(done) {
            const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
            const listener1 = () => {};
            const listener2 = () => {};
            let removeListenerCallCount = 0;
            
            emitter.on('removeListener', (eventName, listener) => {
                removeListenerCallCount++;
            });
            
            emitter.on('testEvent', listener1);
            emitter.on('testEvent', listener2);
            
            emitter.removeAllListeners('testEvent');
            
            assert.strictEqual(removeListenerCallCount, 2); // should be called for each removed listener
            assert.strictEqual(emitter.listenerCount('testEvent'), 0);
            
            done();
        });
        
            })
})