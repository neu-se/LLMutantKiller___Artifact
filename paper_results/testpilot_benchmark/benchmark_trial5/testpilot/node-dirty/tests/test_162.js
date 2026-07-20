let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependOnceListener - basic functionality', function(done) {
        // Create a temporary in-memory database
        let db = dirty();
        
        let callCount = 0;
        let listener = function(data) {
            callCount++;
            assert.strictEqual(data, 'test-data');
            
            // Verify the listener was called only once
            assert.strictEqual(callCount, 1);
            
            // Emit the same event again to verify it's not called twice
            db.em}    })
})