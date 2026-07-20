let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function(done) {
        let callCount = 0;
        
        // Create a dirty database instance
        let db = dirty();
        
        // Create a test listener that increments callCount
        function testListener() {
            callCount++;
        }
        
        // Add the listener
        db.on('load', testListener);
        
        // Trigger the event
        db.em    })
})