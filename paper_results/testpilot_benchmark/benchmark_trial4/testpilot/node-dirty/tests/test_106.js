let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.setMaxListeners with zero', function(done) {
        try {
            const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({
                name: 'test-emitter'
            });
            
            // Set max listeners to 0 (unlimited)
            emitter.setMaxListeners(0);
            
            // Verify the max listeners is set to 0
            assert.strictEqual(emitter.getMaxListeners(), 0);
            done();
        } catch (error) {
            done(error);
        }
    });
});