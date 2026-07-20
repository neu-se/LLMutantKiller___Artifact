let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for with simple string spec', function(done) {
        try {
            const rule = _spacl_core.Rule.for('/test-rule');
            assert(rule !== null, 'Rule should not be null');
            assert(rule !== undefined, 'Rule should not be undefined');
            done();
        } catch (error) {
            done(error);
        }
    });
});