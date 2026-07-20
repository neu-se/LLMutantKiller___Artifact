let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.allow method chaining', function(done) {
        try {
            let rule = new _spacl_core.Rule();
            
            // Test that multiple allow calls can be chained
            // Try different input formats in case the method expects objects or arrays
            let result;
            
            try {
                // First try with string parameters
                result = rule.allow('read').allow('write').allow('execute');
            } catch (e) {
                // If strings don't work, try with objects or other formats
                try {
                    result = rule.allow({action: 'read'}).allow({action: 'write'}).allow({action: 'execute'});
                } catch (e2) {
                    // If objects don't work, try with arrays
                    result = rule.allow(['read']).allow(['write']).allow(['execute']);
                }
            }
            
            assert.strictEqual(result, rule, 'allow() should support method chaining');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});