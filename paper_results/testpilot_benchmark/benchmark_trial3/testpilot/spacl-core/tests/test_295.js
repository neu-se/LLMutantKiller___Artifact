let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.matches - returns true when at least one rule matches', function(done) {
        // Create mock rules
        const mockRule1 = {
            matches: function(path, ctx) {
                return false;
            }
        };
        
        const mockRule2 = {
            matches: function(path, ctx) {
                return true;
            }
        };
        
        const mockRule3 = {
            matches: function(path, ctx) {
                return false;
            }
        };
        
        // Create policy with mock rules
        const policy = new _spacl_core.Policy();
        policy.rules = [mockRule1, mockRule2, mockRule3];
        
        // Test
        const result = policy.matches('/test/path', { user: 'testuser' });
        assert.strictEqual(result, true);
        done();
    });
});