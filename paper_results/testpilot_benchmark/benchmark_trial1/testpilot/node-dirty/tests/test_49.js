let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('multi-test');

        setImmediate(() => {
            assert.strictEqual(listener1Called, true, 'First listener should be called');
            assert.strictEqual(listener2Called, true, 'Second listener should be called');
            done();
        });
    });