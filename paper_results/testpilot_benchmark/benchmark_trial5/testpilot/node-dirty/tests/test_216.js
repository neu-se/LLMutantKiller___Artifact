let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeAllListeners', function() {
        
        it('should handle case when specified event type does not exist', function(done) {
            const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
            const listener = () => {};
            
            emitter.on('existingEvent', listener);
            
            const result = emitter.removeAllListeners('nonExistentEvent');
            
            assert.strictEqual(result, emitter); // should return this
            assert.strictEqual(emitter.listenerCount('existingEvent'), 1); // should remain unchanged
            
            done();
        });
        
            })
})