let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.matches - stops at first matching rule', function(done) {
        let rule1Called = false;
        let rule2Called = false;
        let rule3Called = false;
        
        // Create mock rules to track call order
        const mockRule1 = {
            matches: function(path, ctx) {
                rule1Called = true;
                return false;
            }
        };
        
        const mockRule2 = {
            matches: function(path, ctx) {
                rule2Called = true;
                return true; // This should match and stop execution
            }
        };
        
        const mockRule3 = {
            matches: function(path, ctx) {
                rule3Called = true;
                return false;
            }
        };
        
        // Create policy with mock rules
        const policy = new _spacl_core.Policy();
        policy.rules = [mockRule1, mockRule2, mockRule3];
        
        // Test
        const result = policy.matches('/test/path', { user: 'testuser' });
        
        assert.strictEqual(result, true);
        assert.strictEqual(rule1Called, true);
        assert.strictEqual(rule2Called, true);
        assert.strictEqual(rule3Called, false); // Should not be called since rule2 matched
        done();
    });
});