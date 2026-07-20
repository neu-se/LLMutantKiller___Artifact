let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - error handling', function(done) {
        let db = dirty();
        let errorCaught = false;
        
        // Set up uncaught exception handler before adding listeners
        process.once('uncaughtException', function(err) {
            assert.strictEqual(err.message, 'Test error');
            errorCaught = true;
        });
        
        // Test that errors in the listener don't break the once functionality
        db.once('error-event', function() {
            throw new Error('Test error');
        });
        
        // Add another listener to verify the event still works
        db.once('error-event', function() {
            // Give a small delay to ensure the error handler runs first
            setTimeout(() => {
                assert.strictEqual(errorCaught, true);
                done();
            }, 10);
        });
        
        // Emit the event to trigger the listeners
        db.em    })
})