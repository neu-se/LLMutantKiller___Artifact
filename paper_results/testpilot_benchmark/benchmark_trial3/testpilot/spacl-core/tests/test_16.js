let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test malformed wildcards error', function() {
        assert.throws(() => {
            new _spacl_core.Matcher('/api/user*s');
        }, /Path contains malformed wildcards/);
        
        assert.throws(() => {
            new _spacl_core.Matcher('/api/***');
        }, /Path contains malformed wildcards/);
    });
});