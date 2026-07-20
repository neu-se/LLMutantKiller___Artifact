let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    let emitter;
    
    beforeEach(function() {
        emitter = new EventEmitter();
    });
    
    it('test dirty.Dirty.on with basic event', function(done) {
        let eventFired = false;
        
        // Set up the event handler
        dirty.Dirty.on(emitter, 'test-event');
        
        // Listen for the event to verify it was handled
        emitter.on('test-event', function() {
            eventFired = true;
            assert.strictEqual(eventFired, true);
            done();
        });
        
        // Emit the event
        emitter.em    })
})