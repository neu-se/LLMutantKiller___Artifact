let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.allow method chaining', function(done) {
        try {
            let rule = new _spacl_core.Rule();
            
            // Test that multiple allow calls can be chained
            // The error suggests the allow method might expect different parameters
            // Let's try with more specific permission objects or check if the method exists
            if (typeof rule.allow !== 'function') {
                throw new Error('allow method is not available on Rule instance');
            }
            
            let result = rule.allow('read').allow('write').allow('execute');
            
            assert.strictEqual(result, rule, 'allow() should support method chaining');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});