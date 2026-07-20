let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - with parameters', function(done) {
        let db = dirty();
        
        let receivedArgs = [];
        
        // Register once listener that captures multiple arguments
        db.once('test-event', function(arg1, arg2, arg3) {
            receivedArgs = [arg1, arg2, arg3];
            
            // Verify the arguments were received correctly
            assert.deepEqual(receivedArgs, ['hello', 'world', 123]);
            
            // Call done to complete the async test
            done();
        });
        
        // Emit event with multiple arguments
        db.em    })
})