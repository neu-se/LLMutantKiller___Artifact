let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    let db;
    
    beforeEach(function() {
        db = dirty();
    });
    
    it('keepEvent', function() {
        // Add a simple test to verify the db works
        db.set('test', 'value');
        assert.equal(db.get('test'), 'value');
    });
});