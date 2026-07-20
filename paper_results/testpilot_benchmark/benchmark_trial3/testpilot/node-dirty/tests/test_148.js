let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function(done) {
        let callOrder = [];
        let db = dirty();
        
        // Add a regular listener
        db.on('test-event', function() {
            callOrder.push('second');
        });
        
        // Add a prepended listener (should be called first)
        db.prependListener('test-event', function() {
            callOrder.push('first');
        });
        
        // Emit the event
        db.em    })
})