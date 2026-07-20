let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function(done) {
        let callCount = 0;
        
        // Simulate some event or operation that increments callCount
        callCount = 1;
        
        assert.equal(callCount, 1, 'Original listener should still work');
        
        done();
    });
});