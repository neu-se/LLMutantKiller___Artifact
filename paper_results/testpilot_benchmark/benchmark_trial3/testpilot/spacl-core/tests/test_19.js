let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test invalid characters error', function() {
        assert.throws(() => {
            new _spacl_core.Matcher('/api/users@invalid');
        }, /Path contains invalid characters/);
    });
});