let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for with complex object spec', function(done) {
        try {
            const spec = {
                name: 'complex-rule',
                conditions: [
                    { field: 'user.role', operator: 'equals', value: 'admin' },
                    { field: 'resource.type', operator: 'in', value: ['document', 'file'] }
                ],
                action: 'allow',
                priority: 100
            };
            const rule = _spacl_core.Rule.for(spec);
            assert(rule !== null, 'Rule should not be null');
            assert(rule !== undefined, 'Rule should not be undefined');
            done();
        } catch (error) {
            done(error);
        }
    });
});