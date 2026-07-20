```javascript
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
        
        // Test 3: Count specific listener
        let count3 = db.listenerCount('test-event', listener1);
        assert.strictEqual(count3, 1, 'Should return 1 when counting specific listener');
        
        // Test 4: Count non-existent specific listener
        let listener3 = function() {};
        let count4 = db.listenerCount('test-event', listener3);
        assert.strictEqual(count4, 0, 'Should return 0 for non-existent specific listener');
        
        // Test 5: Remove listener and count again
        db.removeListener('test-event', listener1);
        let count5 = db.listenerCount('test-event');
        assert.strictEqual(count5, 1, 'Should return 1 after removing one listener');
        
        // Test 6: Count after removing all listeners
        db.removeAllListeners('test-event');
        let count6 = db.listenerCount('test-event');
        assert.strictEqual(count6, 0, 'Should return 0 after removing all listeners');
        
        done();
    });
    
    it('test listenerCount with multiple event types', function(done) {
        let db = dirty();
        
        // Add listeners to different event types
        db.on('event1', function() {});
        db.on('event1', function() {});
        db.on('event2', function() {});
        
        assert.strictEqual(db.listenerCount('event1'), 2, 'Should count listeners for event1');
        assert.strictEqual(db.listenerCount('event2'), 1, 'Should count listeners for event2');
        assert.strictEqual(db.listenerCount('event3'), 0, 'Should return 0 for event3');
        
        done();
    });
    
    it('test listenerCount with once listeners', function(done) {
        let db = dirty();
        
        // Add regular an