let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test', function(done) {
        let callCount = 0;
        let eventOrder = [];
        
        // Create a dirty database instance (assuming it's an EventEmitter)
        let db = dirty();
        
        // Add a prependOnceListener that should be called first and only once
        db.prependOnceListener('test-event', function() {
            callCount++;
            eventOrder.push('once');
        });
        
        // Add regular listeners
        db.on('test-event', function() {
            eventOrder.push('regular');
        });
        
        db.on('test-event', function() {
            eventOrder.push('regular');
        });
        
        // Emit the event multiple times to test the 'once' behavior
        db.em    })
})