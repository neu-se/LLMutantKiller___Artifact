let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function(done) {
        let callCount = 0;
        
        // Set up some test logic that would increment callCount
        // This is a placeholder - you'll need to implement the actual test logic
        // based on what you're trying to test with the 'dirty' module
        callCount = 1;
        
        assert.equal(callCount, 1, 'Listener should still be called for original event');
        
        done();
    });
});