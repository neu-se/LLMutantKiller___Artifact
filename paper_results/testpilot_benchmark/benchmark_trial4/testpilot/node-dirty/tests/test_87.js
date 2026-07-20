let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    function testData() {
        // Add your test logic here
        // For example:
        let db = dirty();
        assert(db !== null, 'Database should be created');
    }
    
    it('test-event', testData);
});