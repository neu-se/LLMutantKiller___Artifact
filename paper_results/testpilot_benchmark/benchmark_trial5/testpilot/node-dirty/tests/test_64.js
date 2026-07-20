let mocha = require('mocha');
let assert = require('assert');
let { EventEmitter } = require('events');

describe('test dirty', function() {
    it('test EventEmitter event listening and emission', function(done) {
        let db = new EventEmitter();
        let eventFired = false;
        let eventData = null;
        
        // Add event listener
        db.on('test-event', function(data) {
            eventFired = true;
            eventData = data;
            
            // Verify the event was fired with correct data
            assert.strictEqual(eventFired, true);
            assert.strictEqual(eventData, 'test data');
            done();
        });
        
        // Emit event
        db.em    })
})