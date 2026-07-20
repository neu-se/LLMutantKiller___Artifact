let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('remove-test');

        // Only first emit should have triggered the listener
        assert.strictEqual(callCount, 1, 'Listener should only be called once');
        done();
    });