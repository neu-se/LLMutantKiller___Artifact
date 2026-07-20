let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy constructor with null/undefined parameters', function(done) {
        try {
            const policy1 = new _spacl_core.Policy(null);
            assert.strictEqual(policy1.name, null);
            
            const policy2 = new _spacl_core.Policy(undefined);
            assert.strictEqual(policy2.name, undefined);
            
            const policy3 = new _spacl_core.Policy('testPolicy', null, undefined);
            assert.strictEqual(policy3.name, 'testPolicy');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});