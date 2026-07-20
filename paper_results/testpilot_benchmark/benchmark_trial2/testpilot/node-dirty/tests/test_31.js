let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter with empty options', function(done) {
        let emitter = dirty.Dirty.EventEmitter({});
        
        // Test basic EventEmitter functionality
        let eventFired = false;
        emitter.on('test', function() {
            eventFired = true;
        });
        
        emitter.em    })
})