let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test version differences', function() {
        // Version 1.0 should allow different wildcard patterns than 1.1
        assert.doesNotThrow(() => {
            new _spacl_core.Matcher('/api/u*', '1.0');
        });
        
        assert.throws(() => {
            new _spacl_core.Matcher('/api/u*', '1.1');
        }, /Path contains malformed wildcards/);
    });
});