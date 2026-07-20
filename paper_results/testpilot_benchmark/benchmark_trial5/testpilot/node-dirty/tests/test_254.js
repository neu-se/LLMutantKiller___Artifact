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
        let callCount = 0;
        
        db.on('shared-event', function() {
            listener1Called = true;
            callCount++;
            checkCompletion();
        });
        
        db.on('shared-event', function() {
            listener2Called = true;
            callCount++;
            checkCompletion();
        });
        
        function checkCompletion() {
            if (callCount === 2) {
                assert.strictEqual(listener1Called, true, 'First listener should be called');
                assert.strictEqual(listener2Called, true, 'Second listener should be called');
                assert.strictEqual(callCount, 2, 'Both listeners should be called');
                done();
            }
        }
        
        // Emit the event to trigger both listeners
        db.em    })
})