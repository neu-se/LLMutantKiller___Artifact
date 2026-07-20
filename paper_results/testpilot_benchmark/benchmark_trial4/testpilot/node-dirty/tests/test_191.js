let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependOnceListener', function(done) {
        // Create a temporary database in memory
        let db = dirty();
        
        // Test 1: Basic functionality - listener should be called once and prepended
        let callCount = 0;
        let eventOrder = [];
        
        // Add a regular listener first
        db.on('test', () => {
            eventOrder.push('regular');
        });
        
        // Prepend a once listener
        db.prependOnceListener('test', () => {
            callCount++;
            eventOrder.push('once');
        });
        
        // Emit the event twice
        db.em    })
})