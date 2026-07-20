let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependListener', function(done) {
        // Create a temporary in-memory dirty database
        let db = dirty();
        
        let callOrder = [];
        
        // Add a regular listener first
        db.on('test-event', function() {
            callOrder.push('second');
        });
        
        // Prepend a listener - this should be called first
        db.prependListener('test-event', function() {
            callOrder.push('first');
        });
        
        // Emit the event
        db.em    })
})