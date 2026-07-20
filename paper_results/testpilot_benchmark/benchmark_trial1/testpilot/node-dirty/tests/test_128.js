let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('multi-event', function(done) {
        let listener1Called = false;
        let listener2Called = false;
        
        // Create a dirty database instance
        let db = dirty();
        
        // Add two listeners for the same event
        db.on('load', function() {
            listener1Called = true;
        });
        
        db.on('load', function() {
            listener2Called = true;
            
            // Verify both listeners were called
            assert.equal(listener1Called, true);
            assert.equal(listener2Called, true);
            done();
        });
        
        // Trigger the load event by emitting it manually
        db.em    })
})