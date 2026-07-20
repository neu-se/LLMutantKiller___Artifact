let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('multi-listener', function(done) {
        let listener1Called = false;
        let listener2Called = false;
        
        // Create a dirty database instance
        let db = dirty();
        
        // Add first listener
        db.on('load', function() {
            listener1Called = true;
        });
        
        // Add second listener
        db.on('load', function() {
            listener2Called = true;
            
            // Check assertions after both listeners have had a chance to run
            setTimeout(function() {
                assert.strictEqual(listener1Called, true, 'First listener should be called');
                assert.strictEqual(listener2Called, true, 'Second listener should be called');
                done();
            }, 10);
        });
        
        // Trigger the load event by setting a value
        db.set('test', 'value');
    });
});