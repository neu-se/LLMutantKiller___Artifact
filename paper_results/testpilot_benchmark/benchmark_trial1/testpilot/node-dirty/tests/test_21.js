let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    let emitter;
    
    beforeEach(function() {
        emitter = new EventEmitter();
    });
    
    it('test dirty.Dirty.on with options object', function(done) {
        let options = { once: true, priority: 'high' };
        let eventCount = 0;
        
        // Set up the event handler with options
        dirty.Dirty.on(emitter, 'test-event-with-options', options);
        
        // Listen for the event
        emitter.on('test-event-with-options', function() {
            eventCount++;
        });
        
        // Emit the event multiple times
        emitter.em    })
})