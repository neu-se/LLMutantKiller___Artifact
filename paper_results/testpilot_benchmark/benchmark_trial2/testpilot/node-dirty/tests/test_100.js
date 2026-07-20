let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.addListener - basic functionality', function(done) {
        // Create a temporary in-memory dirty database
        let db = dirty();
        let eventEmitter = db;
        
        let callCount = 0;
        let testListener = function(data) {
            callCount++;
            assert.equal(data, 'test-data');
            if (callCount === 1) {
                done();
            }
        };
        
        // Test addListener method
        eventEmitter.addListener('test-event', testListener);
        
        // Emit the event to verify listener was added
        eventEmitter.em    })
})