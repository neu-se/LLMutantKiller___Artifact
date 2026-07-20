let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependOnceListener', function(done) {
        // Create a temporary in-memory database
        let db = dirty();
        
        let callCount = 0;
        let eventOrder = [];
        
        // Add a regular listener first
        db.on('test-event', function() {
            eventOrder.push('regular');
        });
        
        // Add a prependOnceListener - should execute first and only once
        db.prependOnceListener('test-event', function() {
            callCount++;
            eventOrder.push('prepended-once');
        });
        
        // Emit the event multiple times
        db.em    })
})