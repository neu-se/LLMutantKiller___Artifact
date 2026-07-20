let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    let db;
    
    beforeEach(function() {
        db = dirty();
    });
    
    it('remove-test', function() {
        function testListener() {
            // Test listener function
        }
        
        // Add the listener first
        db.on('remove-test', testListener);
        
        // Then remove it
        db.removeListener('remove-test', testListener);
        
        // Verify the listener was removed
        assert.equal(db.listenerCount('remove-test'), 0);
    });
});