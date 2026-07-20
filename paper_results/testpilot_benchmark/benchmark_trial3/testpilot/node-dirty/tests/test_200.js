let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeAllListeners', function() {
        
        it('should handle empty events object', function(done) {
            const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
            
            // Remove _events to simulate undefined state
            emitter._events = undefined;
            
            const result = emitter.removeAllListeners();
            
            // Should return this without error
            assert.strictEqual(result, emitter);
            
            done();
        });

            })
})