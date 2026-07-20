let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test path must not end with slash error', function() {
        assert.throws(() => {
            new _spacl_core.Matcher('/api/users/');
        }, /Path must not end with a slash/);
    });
});