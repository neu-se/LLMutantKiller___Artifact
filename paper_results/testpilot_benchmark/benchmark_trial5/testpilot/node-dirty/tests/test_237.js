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
            assert.strictEqual(typeof count3, 'number', 'Should return a number when checking specific listener');
        } catch (e) {
            // Some implementations may not support the listener parameter
            console.log('Specific listener counting not supported');
        }
        
        // Test 4: Remove a listener and recount
        db.removeListener('test-event', listener1);
        let count4 = db.listenerCount('test-event');
        assert.strictEqual(count4, 1, 'Should return 1 after removing one listener');
        
        // Test 5: Remove all listeners and count
        db.removeAllListeners('test-event');
        let count5 = db.listenerCount('test-event');
        assert.strictEqual(count5, 0, 'Should return 0 after removing all listeners');
        
        // Test 6: Test with different event types
        db.on('event-a', function() {});
        db.on('event-b', function() {});
        db.on('event-b', function() {});
        
        assert.strictEqual(db.listenerCount('event-a'), 1, 'Should count listeners for event-a correctly');
        assert.strictEqual(db.listenerCount('event-b'), 2, 'Should count listeners for event-b correctly');
        assert.strictEqual(db.listenerCount('event-c'), 0, 'Should return 0 for event-c with no listeners');
        
        done();
    });
});