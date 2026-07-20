let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.getEventListeners with EventEmitter', function(done) {
        const emitter = new EventEmitter();
        
        // Test with no listeners
        let listeners = dirty.Dirty.getEventListeners(emitter, 'test');
        assert.strictEqual(Array.isArray(listeners), true);
        assert.strictEqual(listeners.length, 0);
        
        // Add a listener
        const testListener = function() {};
        emitter.on('test', testListener);
        
        // Test with one listener
        listeners = dirty.Dirty.getEventListeners(emitter, 'test');
        assert.strictEqual(listeners.length, 1);
        assert.strictEqual(listeners[0], testListener);
        
        done();
    });

    })