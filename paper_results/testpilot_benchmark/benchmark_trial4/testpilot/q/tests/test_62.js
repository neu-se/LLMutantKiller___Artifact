let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick handles exceptions in callback', function(done) {
        // Note: This test verifies that exceptions don't crash the process
        // but are handled appropriately by the event loop
        let callbackExecuted = false;
        
        q.nextTick(function() {
            callbackExecuted = true;
            throw new Error('Test error');
        });
        
        // Schedule another nextTick to verify the first one executed
        q.nextTick(function() {
            assert.strictEqual(callbackExecuted, true);
            done();
        });
    });
});