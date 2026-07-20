let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function() {
        let callCount = 0;
        let db = dirty();
        
        // Define test listener
        function testListener() {
            callCount++;
        }
        
        // Add listener
        db.on('test-event', testListener);
        
        // Emit event to trigger listener
        db.em    })
})