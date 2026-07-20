let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('should test event functionality', function() {
        let emitter = new EventEmitter();
        
        // Test that the emitter can emit and listen to events
        let eventFired = false;
        
        emitter.on('test', function() {
            eventFired = true;
        });
        
        emitter.em    })
})