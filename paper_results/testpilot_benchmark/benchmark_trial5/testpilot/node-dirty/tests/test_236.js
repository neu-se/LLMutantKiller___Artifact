let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.rawListeners', function(done) {
        try {
            // Create an instance of EventEmitterAsyncResource with required options
            let emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({
                name: 'test-emitter'
            });
            
            // Test 1: rawListeners should return empty array for non-existent event type
            let listeners = emitter.rawListeners('nonexistent');
            assert(Array.isArray(listeners), 'rawListeners should return an array');
            assert.strictEqual(listeners.length, 0, 'Should return empty array for non-existent event');
            
            // Test 2: Add a listener and verify rawListeners returns it
            function testListener1() { return 'test1'; }
            emitter.on('test', testListener1);
            
            let testListeners = emitter.rawListeners('test');
            assert(Array.isArray(testListeners), 'rawListeners should return an array');
            assert.strictEqual(testListeners.length, 1, 'Should return array with one listener');
            assert.strictEqual(testListeners[0], testListener1, 'Should return the exact listener function');
            
            // Test 3: Add multiple listeners and verify rawListeners returns all
            function testListener2() { return 'test2'; }
            function testListener3() { return 'test3'; }
            emitter.on('test', testListener2);
            emitter.on('test', testListener3);
            
            let multipleListeners = emitter.rawListeners('test');
            assert.strictEqual(multipleListeners.length, 3, 'Should return array with three listeners');
            assert.strictEqual(multipleListeners[0], testListener1, 'First listener should match');
            assert.strictEqual(multipleListeners[1], testListener2, 'Second listener should match');
            assert.strictEqual(multipleListeners[2], testListener3, 'Third listener should match');
            
            // Test 4: Test with different event types
            function otherListener() { return 'other'; }
            emitter.on('other', otherListener);
            
            let otherListeners = emitter.rawListeners('other');
            assert.strictEqual(otherListeners.length, 1, 'Should return one listener for other event');
            assert.strictEqual(otherListeners[0], otherListener, 'Should return correct listener for other event');
            
            // Verify original event listeners are unchanged
            let originalListeners = emitter.rawListeners('test');
            assert.strictEqual(originalListeners.length, 3, 'Original event listeners should be unchanged');
            
            // Test 5: Test with once listeners
            function onceListener() { return 'once'; }
            emitter.once('once-event', onceListener);
            
            let onceListeners = emitter.rawListeners('once-event');
            assert.strictEqual(onceListeners.length, 1, 'Should return once listener');
            
            done();
        } catch (error) {
            done(error);
        }
    });
    
});