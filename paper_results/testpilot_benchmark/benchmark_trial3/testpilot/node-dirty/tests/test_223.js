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
        
        // Test 2: Add a listener and count
        let testListener1 = function() {};
        db.on('test-event', testListener1);
        let count2 = db.listenerCount('test-event');
        assert.strictEqual(count2, 1, 'Should return 1 after adding one listener');
        
        // Test 3: Add multiple listeners and count
        let testListener2 = function() {};
        let testListener3 = function() {};
        db.on('test-event', testListener2);
        db.on('test-event', testListener3);
        let count3 = db.listenerCount('test-event');
        assert.strictEqual(count3, 3, 'Should return 3 after adding three listeners');
        
        // Test 4: Count listeners for different event type
        db.on('another-event', function() {});
        let count4 = db.listenerCount('another-event');
        assert.strictEqual(count4, 1, 'Should return 1 for different event type');
        let count5 = db.listenerCount('test-event');
        assert.strictEqual(count5, 3, 'Original event should still have 3 listeners');
        
        // Test 5: Remove a listener and count
        db.removeListener('test-event', testListener1);
        let count6 = db.listenerCount('test-event');
        assert.strictEqual(count6, 2, 'Should return 2 after removing one listener');
        
        // Test 6: Test with specific listener parameter (if supported)
        try {
            let count7 = db.listenerCount('test-event', testListener2);
            // If the method supports the listener parameter, it should return 1 or 0
            assert(typeof count7 === 'number', 'Should return a number when listener parameter is provided');
        } catch (e) {
            // If listener parameter is not supported, that's also valid
            console.log('Listener parameter not supported, which is acceptable');
        }
        
        done();
    });
    
    })