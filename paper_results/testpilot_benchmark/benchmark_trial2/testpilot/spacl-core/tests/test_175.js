let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap.for with empty policies', function(done) {
        try {
            const policyMap = _spacl_core.PolicyMap.for();
            assert(policyMap !== null, 'PolicyMap should not be null');
            assert(typeof policyMap === 'object', 'PolicyMap should be an object');
            done();
        } catch (error) {
            done(error);
        }
    });

    })