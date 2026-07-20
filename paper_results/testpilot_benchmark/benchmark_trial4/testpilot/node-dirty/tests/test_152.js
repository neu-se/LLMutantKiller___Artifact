let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event');
        
        // Verify the prepended listener was called first
        assert.deepEqual(callOrder, ['first', 'second']);
        done();
    });