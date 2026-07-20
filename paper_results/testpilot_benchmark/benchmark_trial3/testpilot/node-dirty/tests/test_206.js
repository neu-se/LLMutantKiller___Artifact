let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeAllListeners', function() {
        
        it('should handle removing listeners for non-existent event type', function(done) {
            const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({
                name: 'test-emitter'
            });
            
            const listener1 = () => {};
            emitter.on('existing', listener1);
            
            // Try to remove listeners for non-existent event
            const result = emitter.removeAllListeners('nonexistent');
            
            // Should return this and not affect existing listeners
            assert.strictEqual(result, emitter);
            assert.strictEqual(emitter.listenerCount('existing'), 1);
            
            done();
        });

    })
})