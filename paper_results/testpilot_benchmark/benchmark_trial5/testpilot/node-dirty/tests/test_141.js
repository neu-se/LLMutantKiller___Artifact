let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event');
        
        // Verify the listener was called only once
        setTimeout(() => {
            assert.strictEqual(callCount, 1, 'Once listener should only be called once');
            done();
        }, 10);
    });