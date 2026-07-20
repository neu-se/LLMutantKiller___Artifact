let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeAllListeners', function() {
        
        it('should handle case when no events are registered', function(done) {
            const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
            
            const result = emitter.removeAllListeners();
            
            assert.strictEqual(result, emitter); // should return this
            assert.strictEqual(emitter._eventsCount, 0);
            
            done();
        });
        
            })
})