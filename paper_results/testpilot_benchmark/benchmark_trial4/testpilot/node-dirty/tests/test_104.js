let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.setMaxListeners with negative value throws error', function(done) {
        try {
            const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({
                name: 'test-emitter'
            });
            
            // Attempt to set negative max listeners should throw an error
            assert.throws(() => {
                emitter.setMaxListeners(-1);
            }, /RangeError/);
            
            done();
        } catch (error) {
            done(error);
        }
    });
});