let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - with error event', function(done) {
        let db = dirty();
        
        let errorCaught = false;
        
        // Test once with error event
        db.once('error', function(err) {
            errorCaught = true;
            assert(err instanceof Error);
            assert.strictEqual(err.message, 'test error');
            
            setTimeout(() => {
                assert.strictEqual(errorCaught, true);
                done();
            }, 10);
        });
        
        // Emit an error
        db.em    })
})