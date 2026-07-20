let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function(done) {
        let callCount = 0;
        
        // Create a dirty database instance
        let db = dirty();
        
        // Define a test listener
        function testListener() {
            callCount++;
        }
        
        // Add the listener
        db.on('load', testListener);
        
        // Remove the listener
        db.removeListener('load', testListener);
        
        // Emit the event - listener should not be called
        db.em    })
})