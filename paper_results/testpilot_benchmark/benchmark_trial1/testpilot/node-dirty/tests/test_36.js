let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    let emitter;
    
    beforeEach(function() {
        emitter = new EventEmitter();
    });
    
    it('test dirty.Dirty.on with empty options (default)', function(done) {
        let eventData = null;
        
        // Set up the event handler with default options
        dirty.Dirty.on(emitter, 'data-event');
        
        // Listen for the event with data
        emitter.on('data-event', function(data) {
            eventData = data;
            // Add assertion to verify the data
            assert.strictEqual(eventData, 'test-data');
            done(); // Call done to complete the async test
        });
        
        // Emit the event with data
        emitter.em    })
})