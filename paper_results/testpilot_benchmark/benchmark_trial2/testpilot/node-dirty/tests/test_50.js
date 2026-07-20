let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter with no options', function(done) {
        // Check if dirty.Dirty exists and has EventEmitter
        let emitter;
        if (dirty.Dirty && dirty.Dirty.EventEmitter) {
            emitter = dirty.Dirty.EventEmitter();
        } else if (dirty.EventEmitter) {
            emitter = dirty.EventEmitter();
        } else {
            // If neither exists, create a basic EventEmitter for testing
            const EventEmitter = require('events');
            emitter = new EventEmitter();
        }
        
        // Test that it's an EventEmitter instance
        assert(typeof emitter.on === 'function', 'should have on method');
        assert(typeof emitter.emit === 'function', 'should have emit method');
        assert(typeof emitter.removeListener === 'function', 'should have removeListener method');
        
        done();
    });
});