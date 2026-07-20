let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test', function(done) {
        let callCount = 0;
        let eventOrder = [];
        
        // Create a dirty database instance
        let db = dirty();
        
        // Set up event listeners to test prependOnceListener functionality
        db.prependOnceListener('test-event', function() {
            callCount++;
            eventOrder.push('once');
        });
        
        db.on('test-event', function() {
            eventOrder.push('regular');
        });
        
        db.on('test-event', function() {
            eventOrder.push('regular');
        });
        
        // Emit the event multiple times
        db.em    })
})