let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.getEventListeners with EventEmitter', function(done) {
        const emitter = new EventEmitter();
        const listener1 = () => {};
        const listener2 = () => {};
        
        // Add some listeners
        emitter.on('test', listener1);
        emitter.on('test', listener2);
        emitter.on('other', () => {});
        
        // Test getting listeners for specific event type
        const listeners = dirty.Dirty.getEventListeners(emitter, 'test');
        assert.strictEqual(Array.isArray(listeners), true);
        assert.strictEqual(listeners.length, 2);
        assert.strictEqual(listeners.includes(listener1), true);
        assert.strictEqual(listeners.includes(listener2), true);
        
        done();
    });
    
    })