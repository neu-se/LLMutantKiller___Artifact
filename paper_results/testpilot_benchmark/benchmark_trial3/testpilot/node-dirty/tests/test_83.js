let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.setMaxListeners', function() {
        
        it('should throw error for invalid number parameter', function(done) {
            try {
                assert.throws(() => {
                    dirty.Dirty.EventEmitter.EventEmitterAsyncResource.setMaxListeners(-1);
                }, /The value of "setMaxListeners" is out of range/);
                
                assert.throws(() => {
                    dirty.Dirty.EventEmitter.EventEmitterAsyncResource.setMaxListeners('invalid');
                }, /The "setMaxListeners" argument must be of type number/);
                
                done();
            } catch (error) {
                done(error);
            }
        });

            })
})