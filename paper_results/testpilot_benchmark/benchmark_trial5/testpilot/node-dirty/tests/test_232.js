let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.listeners', function(done) {
        // Create a new EventEmitterAsyncResource instance
        let emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
        
        // Test 1: listeners() returns empty array for event type with no listeners
        let listeners = emitter.listeners('test-event');
        assert(Array.isArray(listeners), 'listeners should return an array');
        assert.strictEqual(listeners.length, 0, 'should return empty array for event with no listeners');
        
        // Test 2: listeners() returns correct listeners after adding them
        let listener1 = function() { console.log('listener1'); };
        let listener2 = function() { console.log('listener2'); };
        
        emitter.on('test-event', listener1);
        emitter.on('test-event', listener2);
        
        listeners = emitter.listeners('test-event');
        assert.strictEqual(listeners.length, 2, 'should return array with 2 listeners');
        assert.strictEqual(listeners[0], listener1, 'first listener should match');
        assert.strictEqual(listeners[1], listener2, 'second listener should match');
        
        // Test 3: listeners() returns empty array after removing all listeners
        emitter.removeAllListeners('test-event');
        listeners = emitter.listeners('test-event');
        assert.strictEqual(listeners.length, 0, 'should return empty array after removing all listeners');
        
        // Test 4: listeners() for different event types are independent
        let listener3 = function() { console.log('listener3'); };
        emitter.on('event-a', listener1);
        emitter.on('event-b', listener2);
        emitter.on('event-b', listener3);
        
        let listenersA = emitter.listeners('event-a');
        let listenersB = emitter.listeners('event-b');
        
        assert.strictEqual(listenersA.length, 1, 'event-a should have 1 listener');
        assert.strictEqual(listenersB.length, 2, 'event-b should have 2 listeners');
        assert.strictEqual(listenersA[0], listener1, 'event-a listener should match');
        assert.strictEqual(listenersB[0], listener2, 'event-b first listener should match');
        assert.strictEqual(listenersB[1], listener3, 'event-b second listener should match');
        
        // Test 5: listeners() returns a copy, not the original array
        let originalListeners = emitter.listeners('event-b');
        originalListeners.push(function() {});
        let newListeners = emitter.listeners('event-b');
        assert.strictEqual(newListeners.length, 2, 'modifying returned array should not affect internal state');
        
        done();
    });
    
    })