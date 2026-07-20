let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule constructor with valid spec', function(done) {
        try {
            const spec = {
                name: 'testRule',
                condition: 'user.role === "admin"',
                action: 'allow'
            };
            const rule = new _spacl_core.Rule(spec);
            assert(rule instanceof _spacl_core.Rule, 'Rule should be an instance of Rule class');
            done();
        } catch (error) {
            done(error);
        }
    });
});