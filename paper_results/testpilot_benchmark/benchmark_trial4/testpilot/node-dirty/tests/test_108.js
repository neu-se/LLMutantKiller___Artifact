let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.setMaxListeners with default value', function(done) {
        try {
            // Create a new EventEmitterAsyncResource instance with required name option
            const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({
                name: 'test-emitter'
            });
            
            // Set max listeners to default value
            emitter.setMaxListeners();
            
            // Verify the max listeners is set to default (typically 10)
            assert.strictEqual(emitter.getMaxListeners(), 10);
            done();
        } catch (error) {
            done(error);
        }
    });
});