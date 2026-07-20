let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource - constructor with no options', function(done) {
        try {
            const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({
                name: 'test-emitter'
            });
            assert(emitter instanceof dirty.Dirty.EventEmitter.EventEmitterAsyncResource);
            done();
        } catch (error) {
            done(error);
        }
    });
});