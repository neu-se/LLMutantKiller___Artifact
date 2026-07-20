let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.for - creates policy with name and no rules', function(done) {
        const policy = _spacl_core.Policy.for('test-policy');
        
        assert.strictEqual(policy.name, 'test-policy');
        assert.ok(policy);
        done();
    });

    })