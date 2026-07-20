let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    let callCount = 0;
    
    it('existingEvent', function(done) {
        callCount = 1;
        assert.equal(callCount, 1);
        
        done();
    });
});