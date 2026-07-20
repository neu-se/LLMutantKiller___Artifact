let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('multi-event');
        
        // Verify both listeners were called
        assert.equal(listener1Called, true);
        assert.equal(listener2Called, true);
        done();
    });