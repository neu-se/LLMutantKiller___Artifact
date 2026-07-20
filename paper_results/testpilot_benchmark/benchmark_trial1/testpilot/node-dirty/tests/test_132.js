let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event');
        
        // Verify that the prepended listener was called first
        assert.strictEqual(callOrder.length, 2);
        assert.strictEqual(callOrder[0], 'first');
        assert.strictEqual(callOrder[1], 'second');
        
        done();
    });