let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    let db;
    
    before(function() {
        db = dirty();
    });
    
    it('test', function() {
        // Add a simple test to verify db works
        db.set('key', 'value');
        assert.equal(db.get('key'), 'value');
    });
});