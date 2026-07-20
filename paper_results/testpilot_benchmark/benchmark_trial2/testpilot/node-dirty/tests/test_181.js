let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeAllListeners', function() {
        
        it('should handle single function listener correctly', function(done) {
            const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({
                name: 'test-emitter'
            });
            const listener = () => {};
            
            emitter.on('singleEvent', listener);
            assert.strictEqual(emitter.listenerCount('singleEvent'), 1);
            
            const result = emitter.removeAllListeners('singleEvent');
            
            assert.strictEqual(result, emitter);
            assert.strictEqual(emitter.listenerCount('singleEvent'), 0);
            
            done();
        });
    });
});