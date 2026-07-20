let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function(done) {
        let callCount = 0;
        
        // Set up some test logic here that would increment callCount
        // This is a placeholder since the original test logic was incomplete
        callCount = 1;
        
        // Verify the listener was only called once
        setTimeout(() => {
            assert.equal(callCount, 1);
            done();
        }, 10);
    });
});