let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    let db;
    
    beforeEach(function() {
        db = dirty();
    });
    
    it('event2', function() {
        // Test code here - example test
        assert(db);
        assert.equal(typeof db.on, 'function');
    });
});