let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test', function() {
        // Create a dirty database instance
        let db = dirty();
        
        // Test basic functionality
        db.set('key1', 'value1');
        assert.equal(db.get('key1'), 'value1');
    });
});