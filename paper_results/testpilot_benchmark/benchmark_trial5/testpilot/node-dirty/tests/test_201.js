let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function() {
        let db = dirty();
        let callCount = 0;
        
        // Define test listener
        let testListener = function() {
            callCount++;
        };
        
        // Add listener
        db.on('test-event', testListener);
        
        // Emit event to trigger listener
        db.em    })
})