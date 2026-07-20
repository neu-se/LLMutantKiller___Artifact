let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource', function() {
        
        it('should create instance with default options', function(done) {
            try {
                const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({
                    name: 'test-emitter'
                });
                assert(emitter instanceof dirty.Dirty.EventEmitter.EventEmitterAsyncResource);
                assert(typeof emitter.asyncId === 'number');
                assert(typeof emitter.triggerAsyncId === 'number');
                done();
            } catch (error) {
                done(error);
            }
        });

    })
})