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
        
        // Set up multiple event handlers
        dirty.Dirty.on(emitter, 'event1');
        dirty.Dirty.on(emitter, 'event2');
        
        // Listen for both events
        emitter.on('event1', function() {
            event1Fired = true;
        });
        
        emitter.on('event2', function() {
            event2Fired = true;
        });
        
        // Emit both events
        emitter.em    })
})