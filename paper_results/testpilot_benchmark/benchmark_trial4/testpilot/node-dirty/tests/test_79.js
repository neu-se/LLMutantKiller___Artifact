let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('once-test');

        // Should only be called once despite two emits
        assert.strictEqual(callCount, 1, 'Once listener should only be called once');
        done();
    });
});