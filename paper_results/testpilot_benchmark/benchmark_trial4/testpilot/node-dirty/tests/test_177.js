let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    let db;
    
    beforeEach(function() {
        db = dirty();
    });
    
    it('test-event', function() {
        // Test that we can set and get data
        db.set('test-key', 'test-data');
        assert.equal(db.get('test-key'), 'test-data');
    });
});