let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.getEventListeners with EventEmitter', function(done) {
        const EventEmitter = require('events');
        const emitter = new EventEmitter();
        
        // Test getting listeners for an event type that doesn't exist
        let listeners = dirty.Dirty.getEventListeners(emitter, 'test-event');
        assert.strictEqual(Array.isArray(listeners), true);
        assert.strictEqual(listeners.length, 0);
        
        // Add some listeners
        const listener1 = () => {};
        const listener2 = () => {};
        emitter.on('test-event', listener1);
        emitter.on('test-event', listener2);
        
        // Test getting listeners for an event type that has listeners
        listeners = dirty.Dirty.getEventListeners(emitter, 'test-event');
        assert.strictEqual(Array.isArray(listeners), true);
        assert.strictEqual(listeners.length, 2);
        assert.strictEqual(listeners.includes(listener1), true);
        assert.strictEqual(listeners.includes(listener2), true);
        
        done();
    });
    
    })