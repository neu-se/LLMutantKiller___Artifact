let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.rawListeners', function(done) {
        // Create a dirty database instance
        let db = dirty();
        
        // Test 1: rawListeners should return empty array for non-existent event type
        let listeners = db.rawListeners('nonexistent');
        assert(Array.isArray(listeners), 'rawListeners should return an array');
        assert.strictEqual(listeners.length, 0, 'Should return empty array for non-existent event');
        
        // Test 2: rawListeners should return actual listeners after adding them
        let listener1 = function() { console.log('listener1'); };
        let listener2 = function() { console.log('listener2'); };
        
        db.on('test', listener1);
        db.on('test', listener2);
        
        let testListeners = db.rawListeners('test');
        assert(Array.isArray(testListeners), 'rawListeners should return an array');
        assert.strictEqual(testListeners.length, 2, 'Should return array with 2 listeners');
        assert.strictEqual(testListeners[0], listener1, 'First listener should match');
        assert.strictEqual(testListeners[1], listener2, 'Second listener should match');
        
        // Test 3: rawListeners should return wrapped listeners for once() events
        let onceListener = function() { console.log('once listener'); };
        db.once('oncetest', onceListener);
        
        let onceListeners = db.rawListeners('oncetest');
        assert(Array.isArray(onceListeners), 'rawListeners should return an array');
        assert.strictEqual(onceListeners.length, 1, 'Should return array with 1 listener');
        // For once listeners, the raw listener might be wrapped, so we check it exists
        assert(typeof onceListeners[0] === 'function', 'Should return a function');
        
        // Test 4: rawListeners should return empty array after removing all listeners
        db.removeAllListeners('test');
        let removedListeners = db.rawListeners('test');
        assert(Array.isArray(removedListeners), 'rawListeners should return an array');
        assert.strictEqual(removedListeners.length, 0, 'Should return empty array after removing listeners');
        
        // Test 5: rawListeners should handle different event types independently
        let errorListener = function() { console.log('error'); };
        db.on('error', errorListener);
        
        let errorListeners = db.rawListeners('error');
        let testListenersAfter = db.rawListeners('test');
        
        assert.strictEqual(errorListeners.length, 1, 'Error listeners should be 1');
        assert.strictEqual(testListenersAfter.length, 0, 'Test listeners should still be 0');
        
        done();
    });
});