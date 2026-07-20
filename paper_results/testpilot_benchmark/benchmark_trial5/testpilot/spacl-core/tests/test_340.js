let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.for creates a new Policy instance', function(done) {
        // Test creating a policy with just a name
        const policy1 = _spacl_core.Policy.for('testPolicy');
        assert(policy1 instanceof _spacl_core.Policy, 'Should return a Policy instance');
        assert.strictEqual(policy1.name, 'testPolicy', 'Policy name should be set correctly');
        done();
    });

    })