let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - basic functionality', function(done) {
        // Create a temporary in-memory database
        let db = dirty();
        let callCount = 0;
        
        // Test that the listener is called exactly once
        db.once('test-event', function(data) {
            callCount++;
            assert.strictEqual(data, 'test-data');
            assert.strictEqual(callCount, 1);
            
            // Emit the event again to verify it's not called a second time
            db.em})    })
})