let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter event listening and emission', function(done) {
        let db = dirty.Dirty.EventEmitter();
        let eventFired = false;
        let eventData = null;
        
        // Add event listener
        db.on('test-event', function(data) {
            eventFired = true;
            eventData = data;
        });
        
        // Emit event
        db.em    })
})