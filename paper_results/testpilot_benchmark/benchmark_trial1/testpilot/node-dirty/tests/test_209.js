let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.listeners', function(done) {
        // Create a new EventEmitterAsyncResource instance
        let emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
        
        // Test 1: listeners() returns empty array for non-existent event type
        let listeners = emitter.listeners('nonexistent');
        assert(Array.isArray(listeners), 'listeners should return an array');
        assert.strictEqual(listeners.length, 0, 'should return empty array for non-existent event');
        
        // Test 2: listeners() returns correct listeners after adding one
        function testListener1() {}
        emitter.on('test', testListener1);
        listeners = emitter.listeners('test');
        assert.strictEqual(listeners.length, 1, 'should return array with one listener');
        assert.strictEqual(listeners[0], testListener1, 'should return the correct listener function');
        
        // Test 3: listeners() returns multiple listeners in correct order
        function testListener2() {}
        function testListener3() {}
        emitter.on('test', testListener2);
        emitter.on('test', testListener3);
        listeners = emitter.listeners('test');
        assert.strictEqual(listeners.length, 3, 'should return array with three listeners');
        assert.strictEqual(listeners[0], testListener1, 'first listener should be correct');
        assert.strictEqual(listeners[1], testListener2, 'second listener should be correct');
        assert.strictEqual(listeners[2], testListener3, 'third listener should be correct');
        
        // Test 4: listeners() returns separate arrays for different event types
        function otherListener() {}
        emitter.on('other', otherListener);
        let testListeners = emitter.listeners('test');
        let otherListeners = emitter.listeners('other');
        assert.strictEqual(testListeners.length, 3, 'test event should still have 3 listeners');
        assert.strictEqual(otherListeners.length, 1, 'other event should have 1 listener');
        assert.strictEqual(otherListeners[0], otherListener, 'other listener should be correct');
        
        // Test 5: listeners() returns copy of array (modifications don't affect original)
        let listenersCopy = emitter.listeners('test');
        listenersCopy.push(function() {});
        let listenersAfter = emitter.listeners('test');
        assert.strictEqual(listenersAfter.length, 3, 'original listeners array should not be modified');
        
        done();
    });
    
    })