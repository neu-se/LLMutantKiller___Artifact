let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function(done) {
        let callOrder = [];
        
        // Create a dirty database instance
        let db = dirty();
        
        // Add event listeners to track call order
        db.on('test-event', function() {
            callOrder.push('second');
        });
        
        db.prependListener('test-event', function() {
            callOrder.push('first');
        });
        
        // Emit the event
        db.em    })
})