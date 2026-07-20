let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function(done) {
        let callOrder = [];
        
        // Create a dirty database instance
        let db = dirty();
        
        // Add a regular listener
        db.on('load', function() {
            callOrder.push('second');
        });
        
        // Add a prepended listener (should be called first)
        db.prependListener('load', function() {
            callOrder.push('first');
        });
        
        // Emit the load event to trigger the listeners
        db.em    })
})