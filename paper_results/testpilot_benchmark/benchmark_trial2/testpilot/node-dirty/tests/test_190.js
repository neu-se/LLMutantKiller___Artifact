let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    let db;
    
    before(function() {
        db = dirty();
    });
    
    it('event1', function() {
        // Test code here - for example:
        db.set('key1', 'value1');
        assert.equal(db.get('key1'), 'value1');
    });
});