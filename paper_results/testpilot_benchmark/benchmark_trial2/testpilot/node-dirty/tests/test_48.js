let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test', function(done) {
        let eventFired = false;
        
        // Example test using dirty module
        let db = dirty();
        
        db.on('load', function() {
            eventFired = true;
            assert(eventFired === true, 'event should have been fired');
            done();
        });
        
        // Trigger the load event
        db.load();
    });
});