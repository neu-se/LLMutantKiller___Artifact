let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.deny with various verb types', function(done) {
        try {
            let rule = new _spacl_core.Rule();
            
            // Test with different types of arguments
            rule.deny('create', 'update', 'delete', 'list');
            
            // Test with empty string
            rule.deny('');
            
            // Test with numeric-like strings
            rule.deny('123', 'action1');
            
            // All should complete without throwing
            assert.ok(true);
            
            done();
        } catch (error) {
            done(error);
        }
    });
});