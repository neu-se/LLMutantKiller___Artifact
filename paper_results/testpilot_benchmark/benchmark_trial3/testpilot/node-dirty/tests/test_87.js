let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.setMaxListeners with multiple event targets', function(done) {
        try {
            const emitter1 = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({ name: 'emitter1' });
            const emitter2 = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({ name: 'emitter2' });
            
            // Set max listeners for multiple targets
            dirty.Dirty.EventEmitter.EventEmitterAsyncResource.setMaxListeners(15, emitter1, emitter2);
            
            // Verify both emitters have the correct max listeners
            assert.strictEqual(emitter1.getMaxListeners(), 15);
            assert.strictEqual(emitter2.getMaxListeners(), 15);
            done();
        } catch (error) {
            done(error);
        }
    });
});