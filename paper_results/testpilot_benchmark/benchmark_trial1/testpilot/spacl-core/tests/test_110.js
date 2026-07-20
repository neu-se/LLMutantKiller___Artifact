```javascript
let mocha = require('mocha');
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
    
    it('test @spacl/core.Policy.prototype.matches - returns false when no rules exist', function(done) {
        // Create policy with empty rules array
        const policy = new _spacl_core.Policy();
        policy.rules = [];
        
        // Test
        const result = policy.matches('/test/path', { user: 'testuser' });
        assert.strictEqual(result, false);
        done();
    });
    
    it('test @spacl/core.Policy.prototype.matches - passes correct parameters to rules', function(done) {
        let capturedPath = null;
        let capturedCtx = null;
        
        // Create mock rule that captures parameters
        const mockRule = {
            matches: function(path, ctx) {
                capturedPath = path;
                capturedCtx = ctx;
                return true;
            }
        };
        
        // Create policy with mock rule
        const policy = new _spacl_core.Policy();
        policy.rules = [mockRule];
        
        const testPath = '/api/users';
        const testCtx = { user: 'admin', role: 'administrator' };
        
        // Test
        policy.matches(testPath, testCtx);
        
        assert.strictEqual(capturedPath, testPath);
        assert.deepStrictEqual(capturedCtx, testCtx);
        done();
    });
    
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