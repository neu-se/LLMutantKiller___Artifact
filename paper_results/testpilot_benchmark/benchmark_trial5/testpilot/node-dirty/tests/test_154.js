let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - basic functionality', function(done) {
        // Create a temporary in-memory database
        let db = dirty();
        let callCount = 0;
        
        // Add a listener that should only be called once
        db.once('test-event', function(data) {
            callCount++;
            assert.equal(data, 'test-data');
            assert.equal(callCount, 1);
            
            // Emit the event again to verify it's not called a second time
            db.em})    })
})