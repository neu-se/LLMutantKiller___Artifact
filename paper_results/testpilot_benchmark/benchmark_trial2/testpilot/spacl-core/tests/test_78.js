let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.query - with context object', function(done) {
        try {
            let rule = new _spacl_core.Rule();
            
            // Add a basic rule configuration to avoid undefined match property
            rule.addRule({
                path: '/test',
                method: 'GET',
                allow: true
            });
            
            // Test with various context objects
            let emptyCtx = rule.query('/test', 'GET', {});
            let userCtx = rule.query('/test', 'GET', { user: 'testuser', role: 'admin' });
            let complexCtx = rule.query('/test', 'GET', { 
                user: 'testuser', 
                permissions: ['read', 'write'],
                metadata: { timestamp: Date.now() }
            });
            
            assert(emptyCtx !== undefined, 'Query with empty context should return defined result');
            assert(userCtx !== undefined, 'Query with user context should return defined result');
            assert(complexCtx !== undefined, 'Query with complex context should return defined result');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});