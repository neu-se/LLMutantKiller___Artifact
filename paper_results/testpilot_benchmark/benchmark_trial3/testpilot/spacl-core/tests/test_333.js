let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.for creates different instances', function(done) {
        const policy1 = _spacl_core.Policy.for('policy1');
        const policy2 = _spacl_core.Policy.for('policy2');
        
        assert(policy1 instanceof _spacl_core.Policy, 'First policy should be a Policy instance');
        assert(policy2 instanceof _spacl_core.Policy, 'Second policy should be a Policy instance');
        assert.notStrictEqual(policy1, policy2, 'Should create different instances');
        assert.notStrictEqual(policy1.name, policy2.name, 'Should have different names');
        done();
    });
});