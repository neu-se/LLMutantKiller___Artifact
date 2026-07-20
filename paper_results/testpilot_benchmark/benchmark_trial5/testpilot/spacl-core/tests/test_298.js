let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.matches - returns false when no rules match', function(done) {
        // Create mock rules that all return false
        const mockRule1 = {
            matches: function(path, ctx) {
                return false;
            }
        };
        
        const mockRule2 = {
            matches: function(path, ctx) {
                return false;
            }
        };
        
        // Create policy with mock rules
        const policy = new _spacl_core.Policy();
        policy.rules = [mockRule1, mockRule2];
        
        // Test
        const result = policy.matches('/test/path', { user: 'testuser' });
        assert.strictEqual(result, false);
        done();
    });
});