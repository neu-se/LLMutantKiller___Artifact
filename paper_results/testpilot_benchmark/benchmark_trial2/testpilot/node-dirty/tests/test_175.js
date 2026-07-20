let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeAllListeners', function() {
        
        it('should remove all listeners when no type is specified', function(done) {
            const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
            const listener1 = () => {};
            const listener2 = () => {};
            const listener3 = () => {};
            
            emitter.on('event1', listener1);
            emitter.on('event2', listener2);
            emitter.on('event1', listener3);
            
            assert.strictEqual(emitter.listenerCount('event1'), 2);
            assert.strictEqual(emitter.listenerCount('event2'), 1);
            
            const result = emitter.removeAllListeners();
            
            assert.strictEqual(result, emitter); // should return this
            assert.strictEqual(emitter.listenerCount('event1'), 0);
            assert.strictEqual(emitter.listenerCount('event2'), 0);
            assert.strictEqual(emitter._eventsCount, 0);
            
            done();
        });
        
            })
})