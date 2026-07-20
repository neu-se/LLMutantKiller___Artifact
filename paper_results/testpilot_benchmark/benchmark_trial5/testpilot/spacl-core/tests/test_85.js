let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.allow with various verb types', function(done) {
        try {
            let rule = new _spacl_core.Rule();
            
            // Test with different types of verbs
            let result = rule.allow('create', 'update', 'list', 'admin');
            
            assert.strictEqual(result, rule, 'allow() should handle various verb types');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});