let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    let db;
    
    beforeEach(function() {
        // Create a new in-memory dirty database for each test
        db = dirty();
    });
    
    afterEach(function() {
        // Clean up after each test
        if (db && typeof db.close === 'function') {
            db.close();
        }
    });

    it('should handle multiple listeners for same event', function(done) {
        let listener1Called = false;
        let listener2Called = false;
        let callOrder = [];
        
        db.on('shared-event', function() {
            listener1Called = true;
            callOrder.push('listener1');
        });
        
        db.on('shared-event', function() {
            listener2Called = true;
            callOrder.push('listener2');
            
            // Check assertions after both listeners have been called
            try {
                assert.strictEqual(listener1Called, true, 'Listener 1 should have been called');
                assert.strictEqual(listener2Called, true, 'Listener 2 should have been called');
                assert.strictEqual(callOrder.length, 2, 'Both listeners should have been called');
                assert.deepStrictEqual(callOrder, ['listener1', 'listener2'], 'Listeners should be called in order');
                done();
            } catch (error) {
                done(error);
            }
        });
        
        // Emit the event to trigger both listeners
        db.em    })
})