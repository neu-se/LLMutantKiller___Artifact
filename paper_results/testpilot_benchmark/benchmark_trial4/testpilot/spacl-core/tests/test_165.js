let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for with complex object spec', function(done) {
        try {
            const spec = {
                name: 'complex-rule',
                conditions: ['condition1', 'condition2'],
                actions: ['action1'],
                metadata: {
                    version: '1.0',
                    author: 'test'
                }
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