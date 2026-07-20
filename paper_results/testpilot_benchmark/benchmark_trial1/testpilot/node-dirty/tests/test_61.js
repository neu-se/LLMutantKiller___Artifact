let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('multi-test', function(done) {
        let listener1Called = false;
        let listener2Called = false;
        
        // Create a dirty database instance
        let db = dirty();
        
        // Set up event listeners
        db.on('load', function() {
            listener1Called = true;
        });
        
        db.on('drain', function() {
            listener2Called = true;
        });
        
        // Trigger some operation that would fire these events
        db.set('test', 'value');
        
        setImmediate(() => {
            assert.strictEqual(listener1Called, true, 'First listener should be called');
            assert.strictEqual(listener2Called, true, 'Second listener should be called');
            done();
        });
    });
});