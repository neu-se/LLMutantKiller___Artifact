let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
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
    
    })