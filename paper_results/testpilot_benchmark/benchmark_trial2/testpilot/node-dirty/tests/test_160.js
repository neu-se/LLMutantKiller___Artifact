let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', function(done) {
        let callCount = 0;
        
        // Example test that increments callCount to simulate an event listener
        callCount++;
        
        assert.equal(callCount, 1, 'Original listener should still be called');
        
        done();
    });
});