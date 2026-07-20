let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('increment', function(done) {
        let callCount = 0;
        
        // Create a dirty database instance
        let db = dirty();
        
        // Set up listeners that increment callCount
        db.on('load', function() {
            callCount++;
        });
        
        db.on('drain', function() {
            callCount++;
            
            // Check that both listeners were called
            assert(callCount === 2, 'both listeners should have been called');
            done();
        });
        
        // Trigger events by setting a value
        db.set('test', 'value');
    });
});