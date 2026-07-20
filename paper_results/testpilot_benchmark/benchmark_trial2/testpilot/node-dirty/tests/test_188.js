let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    let callCount = 0;
    
    it('event3', function(done) {
        assert.equal(callCount, 0);
        
        done();
    });
});