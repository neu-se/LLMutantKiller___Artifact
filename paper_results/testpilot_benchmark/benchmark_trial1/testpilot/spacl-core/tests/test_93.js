let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for with simple string spec', function(done) {
        try {
            const spec = "allow user read resource";
            const rule = _spacl_core.Rule.for(spec);
            assert(rule !== null, 'Rule should not be null');
            assert(typeof rule === 'object', 'Rule should be an object');
            done();
        } catch (error) {
            done(error);
        }
    });
});