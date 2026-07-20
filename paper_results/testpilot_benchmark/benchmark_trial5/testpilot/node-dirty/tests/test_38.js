let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('should handle events properly', function(done) {
        let callCount = 0;
        let eventName = 'test-event';
        
        // Create an event emitter or dirty instance to test
        let emitter = new EventEmitter();
        
        // Set up event listener
        emitter.on(eventName, function() {
            callCount++;
        });
        
        // Trigger the event
        emitter.em    })
})