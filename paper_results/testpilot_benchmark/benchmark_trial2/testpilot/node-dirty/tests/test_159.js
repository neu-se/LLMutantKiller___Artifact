let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeListener', function() {
        let emitter;
        
        beforeEach(function() {
            // Create a new EventEmitter instance for each test with required name option
            emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({
                name: 'test-emitter'
            });
        });

        it('should remove a single listener function', function() {
            const listener = function() {};
            emitter.on('test', listener);
            
            // Verify listener was added
            assert.strictEqual(emitter.listenerCount('test'), 1);
            
            // Remove the listener
            const result = emitter.removeListener('test', listener);
            
            // Should return the emitter instance
            assert.strictEqual(result, emitter);
            
            // Listener should be removed
            assert.strictEqual(emitter.listenerCount('test'), 0);
        });

    })
})