let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('removeEvent');
        
        assert.equal(callCount1, 1); // keepEvent listener should be called
        assert.equal(callCount2, 0); // removeEvent listeners should not be called
        
        done();
    });
});