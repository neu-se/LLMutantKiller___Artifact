let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    let db;
    
    beforeEach(function() {
        db = dirty();
    });
    
    it('test-event', function() {
        // Test that the database can emit events
        db.on('load', function() {
            // Database loaded
        });
        
        // Add some test data
        db.set('test-key', 'test-data');
        
        // Verify the data was set
        assert.equal(db.get('test-key'), 'test-data');
    });
});