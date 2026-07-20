let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule constructor with complex spec', function(done) {
        try {
            const spec = {
                name: 'complexRule',
                description: 'A complex rule for testing',
                condition: 'user.permissions.includes("read") && resource.type === "document"',
                action: 'allow',
                priority: 10,
                metadata: {
                    created: new Date(),
                    tags: ['security', 'access-control']
                }
            };
            const rule = new _spacl_core.Rule(spec);
            assert(rule instanceof _spacl_core.Rule, 'Rule should handle complex spec');
            done();
        } catch (error) {
            done(error);
        }
    });
});