let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('EventEmitterAsyncResource.prototype.emitDestroy', function() {
        
        it('should throw ERR_INVALID_THIS when kAsyncResource is undefined', function(done) {
            try {
                // Create an instance and manually break it by removing the internal resource
                const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({
                    name: 'test'
                });
                
                // Access the internal symbol to corrupt the state
                const symbols = Object.getOwnPropertySymbols(emitter);
                const kAsyncResource = symbols.find(s => s.toString().includes('kAsyncResource'));
                if (kAsyncResource) {
                    emitter[kAsyncResource] = undefined;
                }
                
                emitter.emitDestroy();
                done(new Error('Expected ERR_INVALID_THIS to be thrown'));
            } catch (error) {
                assert(error.code === 'ERR_INVALID_THIS' || error.message.includes('EventEmitterAsyncResource'));
                done();
            }
        });

            })
})