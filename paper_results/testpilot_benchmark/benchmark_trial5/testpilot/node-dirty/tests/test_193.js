let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.removeListener - return value', function(done) {
        let db = dirty();
        
        function testListener() {}
        
        // Add listener
        db.on('test-event', testListener);
        
        // Remove listener and check return value (should return the EventEmitter instance)
        let result = db.removeListener('test-event', testListener);
        assert.strictEqual(result, db, 'removeListener should return the EventEmitter instance');
        
        done();
    });
});