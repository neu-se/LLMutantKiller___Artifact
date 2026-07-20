let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event');
        assert.equal(callCount1, 1, 'First listener should not be called after removal');
        assert.equal(callCount2, 2, 'Second listener should still be called');
        
        done();
    });