let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function(done) {
        let eventFired = false;
        let eventData = null;
        
        // Create a dirty database instance
        let db = dirty();
        
        // Set up event listener
        db.on('load', function() {
            eventFired = true;
            eventData = 'test-data';
        });
        
        // Trigger the event (this depends on how dirty module works)
        // For this example, I'll simulate the event firing
        process.nextTick(() => {
            db.em})    })
})