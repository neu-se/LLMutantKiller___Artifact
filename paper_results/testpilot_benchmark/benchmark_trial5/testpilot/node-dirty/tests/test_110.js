let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.listenerCount', function(done) {
        try {
            // Create an EventEmitter instance for testing
            const { EventEmitter } = require('events');
            const emitter = new EventEmitter();
            
            // Test 1: Count listeners when no listeners are attached
            let count = dirty.Dirty.EventEmitter.EventEmitterAsyncResource.listenerCount(emitter, 'test-event');
            assert.strictEqual(count, 0, 'Should return 0 when no listeners are attached');
            
            // Test 2: Add one listener and count
            const listener1 = () => {};
            emitter.on('test-event', listener1);
            count = dirty.Dirty.EventEmitter.EventEmitterAsyncResource.listenerCount(emitter, 'test-event');
            assert.strictEqual(count, 1, 'Should return 1 when one listener is attached');
            
            // Test 3: Add multiple listeners and count
            const listener2 = () => {};
            const listener3 = () => {};
            emitter.on('test-event', listener2);
            emitter.on('test-event', listener3);
            count = dirty.Dirty.EventEmitter.EventEmitterAsyncResource.listenerCount(emitter, 'test-event');
            assert.strictEqual(count, 3, 'Should return 3 when three listeners are attached');
            
            // Test 4: Count listeners for different event type
            count = dirty.Dirty.EventEmitter.EventEmitterAsyncResource.listenerCount(emitter, 'other-event');
            assert.strictEqual(count, 0, 'Should return 0 for event type with no listeners');
            
            // Test 5: Remove a listener and count
            emitter.removeListener('test-event', listener1);
            count = dirty.Dirty.EventEmitter.EventEmitterAsyncResource.listenerCount(emitter, 'test-event');
            assert.strictEqual(count, 2, 'Should return 2 after removing one listener');
            
            // Test 6: Test with 'once' listeners
            const onceListener = () => {};
            emitter.once('once-event', onceListener);
            count = dirty.Dirty.EventEmitter.EventEmitterAsyncResource.listenerCount(emitter, 'once-event');
            assert.strictEqual(count, 1, 'Should count once listeners');
            
            done();
        } catch (error) {
            done(error);
        }
    });
    
    })