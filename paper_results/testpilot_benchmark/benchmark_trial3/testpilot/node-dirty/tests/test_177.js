let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function(done) {
        let callCount = 0;
        let eventOrder = [];
        
        // Create a dirty database instance
        let db = dirty();
        
        // Set up event listeners
        db.prependOnceListener('test-event', function() {
            callCount++;
            eventOrder.push('prepended-once');
        });
        
        // Add regular listeners
        db.on('test-event', function() {
            eventOrder.push('regular');
        });
        
        db.on('test-event', function() {
            eventOrder.push('regular');
        });
        
        db.on('test-event', function() {
            eventOrder.push('regular');
        });
        
        // Emit the event twice to verify prependOnceListener only runs once
        db.em    })
})