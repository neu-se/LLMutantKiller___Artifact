let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependOnceListener - returns emitter', function(done) {
        let db = dirty();
        
        let result = db.prependOnceListener('return-test', function() {
            // Verify the method returns the emitter instance for chaining
            assert.strictEqual(result, db);
            done();
        });
        
        // Emit the event to trigger the listener
        db.em    })
})