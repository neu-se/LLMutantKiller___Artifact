let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.setMaxListeners', function() {
        
        it('should set max listeners on EventEmitter instances', function(done) {
            try {
                const emitter1 = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
                const emitter2 = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
                
                // Set max listeners on specific emitters
                dirty.Dirty.EventEmitter.EventEmitterAsyncResource.setMaxListeners(20, emitter1, emitter2);
                
                assert.strictEqual(emitter1.getMaxListeners(), 20);
                assert.strictEqual(emitter2.getMaxListeners(), 20);
                
                done();
            } catch (error) {
                done(error);
            }
        });

            })
})