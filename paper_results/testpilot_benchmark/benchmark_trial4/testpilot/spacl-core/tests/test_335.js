let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.PolicyMap constructor with no policies', function(done) {
        try {
            const policyMap = new _spacl_core.PolicyMap();
            assert(policyMap instanceof _spacl_core.PolicyMap, 'Should create PolicyMap instance');
            done();
        } catch (error) {
            done(error);
        }
    });

    })