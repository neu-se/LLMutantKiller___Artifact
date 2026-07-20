let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy constructor with name and multiple rules', function(done) {
        try {
            const rule1 = { type: 'allow', resource: 'users' };
            const rule2 = { type: 'deny', resource: 'admin' };
            const rule3 = { type: 'allow', resource: 'posts' };
            const policy = new _spacl_core.Policy('multiRulePolicy', rule1, rule2, rule3);
            assert.strictEqual(policy.name, 'multiRulePolicy');
            assert.ok(policy instanceof _spacl_core.Policy);
            done();
        } catch (error) {
            done(error);
        }
    });

    })