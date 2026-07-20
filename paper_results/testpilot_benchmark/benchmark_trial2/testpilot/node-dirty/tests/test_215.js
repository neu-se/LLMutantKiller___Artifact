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
        if (db && typeof db.close === 'function') {
            db.close();
        }
    });

    it('should handle multiple listeners for same event', function(done) {
        let listener1Called = false;
        let listener2Called = false;
        let callOrder = [];
        let callCount = 0;
        
        db.on('shared-event', function() {
            listener1Called = true;
            callOrder.push('listener1');
            callCount++;
            if (callCount === 2) {
                // Both listeners have been called, now we can assert and finish
                assert.strictEqual(listener1Called, true, 'Listener 1 should be called');
                assert.strictEqual(listener2Called, true, 'Listener 2 should be called');
                assert.strictEqual(callOrder.length, 2, 'Both listeners should be called');
                assert(callOrder.includes('listener1'), 'Call order should include listener1');
                assert(callOrder.includes('listener2'), 'Call order should include listener2');
                done();
            }
        });
        
        db.on('shared-event', function() {
            listener2Called = true;
            callOrder.push('listener2');
            callCount++;
            if (callCount === 2) {
                // Both listeners have been called, now we can assert and finish
                assert.strictEqual(listener1Called, true, 'Listener 1 should be called');
                assert.strictEqual(listener2Called, true, 'Listener 2 should be called');
                assert.strictEqual(callOrder.length, 2, 'Both listeners should be called');
                assert(callOrder.includes('listener1'), 'Call order should include listener1');
                assert(callOrder.includes('listener2'), 'Call order should include listener2');
                done();
            }
        });
        
        // Actually emit the event to trigger the listeners
        db.em    })
})