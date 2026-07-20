let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.setMaxListeners with default value', function(done) {
        try {
            // Create a new EventEmitterAsyncResource instance
            const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
            
            // Set max listeners to default value (should be 10)
            emitter.setMaxListeners();
            
            // Verify the max listeners is set to default
            assert.strictEqual(emitter.getMaxListeners(), 10);
            done();
        } catch (error) {
            done(error);
        }
    });

    })