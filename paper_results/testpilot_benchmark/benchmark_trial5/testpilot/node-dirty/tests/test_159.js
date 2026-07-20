let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    let db;
    
    before(function() {
        db = dirty();
    });
    
    it('test-event', function() {
        // Add your test logic here
        assert(db);
    });
});