let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function() {
        let db = dirty();
        let callCount = 0;
        
        // Define the test listener
        function testListener() {
            callCount++;
        }
        
        // Add the listener
        db.on('test-event', testListener);
        
        // Emit the event
        db.em    })
})