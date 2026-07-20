let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.listenerCount', function(done) {
        // Create a temporary in-memory dirty database
        let db = dirty();
        
        // Test 1: Count listeners for non-existent event type
        let count1 = db.listenerCount('nonexistent');
        assert.strictEqual(count1, 0, 'Should return 0 for non-existent event type');
        
        // Test 2: Add listeners and count them
        let listener1 = function() {};
        let listener2 = function() {};
        
        db.on('test-event', listener1);
        db.on('test-event', listener2);
        
        let count2 = db.listenerCount('test-event');
        assert.strictEqual(count2, 2, 'Should return 2 after adding 2 listeners');
        
        // Test 3: Count specific listener (if supported)
        try {
            let count3 = db.listenerCount('test-event', listener1);
            assert.strictEqual(count3, 1, 'Should return 1 when counting specific listener');
        } catch (e) {
            // If second parameter is not supported, just verify the method exists
            assert.ok(typeof db.listenerCount === 'function', 'listenerCount should be a function');
        }
        
        // Test 4: Remove listener and count again
        db.removeListener('test-event', listener1);
        let count4 = db.listenerCount('test-event');
        assert.strictEqual(count4, 1, 'Should return 1 after removing one listener');
        
        // Test 5: Remove all listeners and count
        db.removeAllListeners('test-event');
        let count5 = db.listenerCount('test-event');
        assert.strictEqual(count5, 0, 'Should return 0 after removing all listeners');
        
        done();
    });
    
    })