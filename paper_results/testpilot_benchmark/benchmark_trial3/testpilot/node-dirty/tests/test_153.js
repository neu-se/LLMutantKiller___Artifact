let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - return value', function(done) {
        let db = dirty();
        
        // Test that once() returns the EventEmitter instance (for chaining)
        let result = db.once('return-test', function() {
            assert.strictEqual(result, db);
            done();
        });
        
        db.em    })
})