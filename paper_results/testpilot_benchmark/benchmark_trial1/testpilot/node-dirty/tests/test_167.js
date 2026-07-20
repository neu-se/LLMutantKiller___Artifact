let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function(done) {
        let db = dirty();
        let eventFired = false;
        
        // Set up event listener
        db.on('test-event', function(data) {
            if (data === 'second-data') {
                eventFired = true;
            }
        });
        
        // Emit the event
        db.em    })
})