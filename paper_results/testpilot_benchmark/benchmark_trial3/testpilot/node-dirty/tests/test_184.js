let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeListener', function() {
        
        let emitter;
        
        beforeEach(function() {
            // Create a new EventEmitter instance for each test with required options
            emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({
                name: 'test-emitter'
            });
        });
        
        it('should remove a single function listener', function() {
            const listener = function() {};
            
            // Add listener
            emitter.on('test', listener);
            assert.strictEqual(emitter.listenerCount('test'), 1);
            
            // Remove listener
            const result = emitter.removeListener('test', listener);
            
            // Verify removal
            assert.strictEqual(emitter.listenerCount('test'), 0);
            assert.strictEqual(result, emitter); // Should return this
        });
        
    })
})