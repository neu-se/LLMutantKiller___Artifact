The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.listeners', function(done) {
        // Create a new EventEmitterAsyncResource instance
        let emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
        
        // Test 1: listeners() returns empty array for event type with no listeners
        let listeners = emitter.listeners('test-event');
        assert(Array.isArray(listeners), 'listeners() should return an array');
        assert.strictEqual(listeners.length, 0, 'should return empty array for event with no listeners');
        
        // Test 2: listeners() returns array with single listener
        function testListener1() {}
        emitter.on('test-event', testListener1);
        listeners = emitter.listeners('test-event');
        assert.strictEqual(listeners.length, 1, 'should return array with one listener');
        assert.strictEqual(listeners[0], testListener1, 'should return the correct listener function');
        
        // Test 3: listeners() returns array with multiple listeners
        function testListener2() {}
        function testListener3() {}
        emitter.on('test-event', testListener2);
        emitter.on('test-event', testListener3);
        listeners = emitter.listeners('test-event');
        assert.strictEqual(listeners.length, 3, 'should return array with three listeners');
        assert(listeners.includes(testListener1), 'should include first listener');
        assert(listeners.includes(testListener2), 'should include second listener');
        assert(listeners.includes(testListener3), 'should include third listener');
        
        // Test 4: listeners() for different event types are independent
        function otherListener() {}
        emitter.on('other-event', otherListener);
        let testEventListeners = emitter.listeners('test-event');
        let otherEventListeners = emitter.listeners('other-event');
        assert.strictEqual(testEventListeners.length, 3, 'test-event should still have 3 listeners');
        assert.strictEqual(otherEventListeners.length, 1, 'other-event should have 1 listener');
        assert.strictEqual(otherEventListeners[0], otherListener, 'other-event should have correct listener');
        
        // Test 5: listeners() returns copy of listeners array (modifications don't affect original)
        let listenersCopy = emitter.listeners('test-event');
        listenersCopy.push(function() {});
        let listenersAfter = emitter.listeners('test-event');
        assert.strictEqual(listenersAfter.length, 3, 'modifying returned array should not affect original listeners');
        
        done();
    });
    
    })
``` 
failed with the following error message:
```
The "options.name" property must be of type string. Received undefined  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.