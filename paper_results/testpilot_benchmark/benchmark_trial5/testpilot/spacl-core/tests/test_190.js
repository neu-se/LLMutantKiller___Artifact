let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for with different path patterns', function(done) {
        // Test creating rules with different path patterns
        const rule1 = _spacl_core.Rule.for('/user/+');
        const rule2 = _spacl_core.Rule.for('/user/:name');
        const rule3 = _spacl_core.Rule.for('/admin/settings');
        
        assert(rule1 instanceof _spacl_core.Rule, 'Should create rule with wildcard pattern');
        assert(rule2 instanceof _spacl_core.Rule, 'Should create rule with parameter pattern');
        assert(rule3 instanceof _spacl_core.Rule, 'Should create rule with static pattern');
        done();
    });

    })