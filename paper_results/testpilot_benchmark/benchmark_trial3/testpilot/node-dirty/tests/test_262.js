let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event-args', function(done) {
        let receivedArgs;
        
        // Create a dirty database instance
        let db = dirty();
        
        // Set up event listener to capture arguments
        db.on('test-event', function() {
            receivedArgs = Array.prototype.slice.call(arguments);
        });
        
        // Emit the event with test arguments
        db.em    })
})