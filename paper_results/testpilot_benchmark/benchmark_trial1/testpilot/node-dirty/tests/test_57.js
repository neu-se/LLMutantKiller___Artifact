let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    let db;
    
    beforeEach(function() {
        db = dirty();
    });
    
    it('once-test', function() {
        // Add a simple test to verify db works
        db.set('test-key', 'test-value');
        assert.equal(db.get('test-key'), 'test-value');
    });
});