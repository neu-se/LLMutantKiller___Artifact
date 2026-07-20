let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('testEvent', function(done) {
        let callCount = 0;
        assert.equal(callCount, 0);
        
        done();
    });
});