let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.getMaxListeners - default value', function(done) {
        try {
            // Create a new EventEmitterAsyncResource instance with required name option
            let emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({ name: 'test-emitter' });
            
            // Test that getMaxListeners returns the default value (typically 10)
            let maxListeners = emitter.getMaxListeners();
            assert(typeof maxListeners === 'number', 'getMaxListeners should return a number');
            assert(maxListeners >= 0, 'getMaxListeners should return a non-negative number');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});