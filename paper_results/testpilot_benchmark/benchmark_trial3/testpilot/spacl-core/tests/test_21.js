let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher constructor with complex spec object', function(done) {
        try {
            const spec = {
                pattern: 'complex',
                rules: ['rule1', 'rule2'],
                options: { strict: true }
            };
            const matcher = new _spacl_core.Matcher(spec, '1.2');
            assert.ok(matcher instanceof _spacl_core.Matcher);
            done();
        } catch (error) {
            done(error);
        }
    });
});