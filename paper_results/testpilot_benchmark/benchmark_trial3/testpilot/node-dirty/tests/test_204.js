let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeAllListeners', function() {
        
        it('should properly handle _eventsCount when removing all listeners', function(done) {
            const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({
                name: 'test-emitter'
            });
            
            const listener1 = () => {};
            const listener2 = () => {};
            
            emitter.on('event1', listener1);
            emitter.on('event2', listener2);
            
            // Remove all listeners
            emitter.removeAllListeners();
            
            // _eventsCount should be reset to 0
            assert.strictEqual(emitter._eventsCount, 0);
            
            done();
        });
    });
});