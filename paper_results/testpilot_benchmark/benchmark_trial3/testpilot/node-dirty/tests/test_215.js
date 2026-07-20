let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    let db;
    
    before(function() {
        db = dirty();
    });
    
    it('event1', function() {
        // Test implementation here
        db.set('key', 'value');
        assert.equal(db.get('key'), 'value');
    });
});