let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - returns this', function(done) {
        let db = dirty();
        
        // Test that once() returns the instance for chaining
        let result = db.once('test-event', function() {});
        assert.strictEqual(result, db);
        done();
    });

    })