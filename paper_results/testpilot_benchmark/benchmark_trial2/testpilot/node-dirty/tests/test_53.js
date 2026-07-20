let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource - constructor with options', function(done) {
        try {
            const options = { name: 'test-emitter' };
            const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource(options);
            assert(emitter instanceof dirty.Dirty.EventEmitter.EventEmitterAsyncResource);
            done();
        } catch (error) {
            done(error);
        }
    });

    })