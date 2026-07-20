let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy constructor with empty name', function(done) {
        try {
            const policy = new _spacl_core.Policy('');
            assert.strictEqual(policy.name, '');
            assert.ok(policy instanceof _spacl_core.Policy);
            done();
        } catch (error) {
            done(error);
        }
    });
});