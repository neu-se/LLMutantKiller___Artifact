let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    let callCount = 0;
    
    it('testEvent', function(done) {
        assert.equal(callCount, 0);
        
        done();
    });
});