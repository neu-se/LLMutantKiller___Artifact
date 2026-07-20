let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function(done) {
        let receivedArgs = [];
        
        // Assuming dirty has an event mechanism or method to test
        // This is a placeholder - you'll need to adapt based on how dirty actually works
        dirty.on('test-event', function() {
            receivedArgs = Array.from(arguments);
        });
        
        // Trigger the event with the test arguments
        dirty.em    })
})