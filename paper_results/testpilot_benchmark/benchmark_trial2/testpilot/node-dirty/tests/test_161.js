let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function(done) {
        let db = dirty();
        let callCount1 = 0;
        let callCount2 = 0;
        
        // First listener
        function listener1() {
            callCount1++;
        }
        
        // Second listener
        function listener2() {
            callCount2++;
        }
        
        // Add both listeners
        db.on('set', listener1);
        db.on('set', listener2);
        
        // Trigger event once
        db.set('key1', 'value1');
        
        // Remove first listener
        db.removeListener('set', listener1);
        
        // Trigger event again
        db.set('key2', 'value2');
        
        // Verify counts
        assert.equal(callCount1, 1, 'First listener should not be called after removal');
        assert.equal(callCount2, 2, 'Second listener should still be called');
        
        done();
    });
});