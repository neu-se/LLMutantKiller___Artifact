let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    let emitter;
    
    beforeEach(function() {
        emitter = new EventEmitter();
    });
    
    it('test dirty.Dirty.on with multiple events on same emitter', function(done) {
        let event1Fired = false;
        let event2Fired = false;
        let eventsReceived = 0;
        
        // Listen for both events
        emitter.on('event1', function() {
            event1Fired = true;
            eventsReceived++;
            if (eventsReceived === 2) {
                assert.strictEqual(event1Fired, true);
                assert.strictEqual(event2Fired, true);
                done();
            }
        });
        
        emitter.on('event2', function() {
            event2Fired = true;
            eventsReceived++;
            if (eventsReceived === 2) {
                assert.strictEqual(event1Fired, true);
                assert.strictEqual(event2Fired, true);
                done();
            }
        });
        
        // Emit both events
        emitter.em    })
})