let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    let db;
    
    before(function() {
        db = dirty();
    });
    
    it('test-event', function() {
        // Add actual test logic here
        assert(db);
    });
});