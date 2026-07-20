let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - returns EventEmitter', function(done) {
        let db = dirty();
        
        // Test that once() returns the EventEmitter instance for chaining
        let result = db.once('chain-event', function() {
            assert.strictEqual(result, db);
            done();
        });
        
        assert.strictEqual(result, db);
        
        // Emit the event to trigger the listener
        db.em    })
})