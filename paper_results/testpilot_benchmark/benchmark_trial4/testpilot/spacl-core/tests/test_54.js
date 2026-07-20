let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test context-dependent path matching', function(done) {
        const rule = new _spacl_core.Rule('/api/users/*');
        
        // Mock path and regex with context properties
        const mockPath = {
            match: function(regex) {
                if (this.path === '/api/users/123') {
                    return [this.path, '123'];
                }
                return null;
            },
            path: '/api/users/123'
        };
        
        // Test with context properties
        rule.regex.props = ['userId'];
        
        // Test with matching context
        const ctx = { userId: '123' };
        assert.equal(rule.matches(mockPath, ctx), true);
        
        // Test with non-matching context
        const wrongCtx = { userId: '456' };
        assert.equal(rule.matches(mockPath, wrongCtx), false);
        
        // Test with undefined context
        assert.equal(rule.matches(mockPath), false);
        
        // Test with missing property in context
        const incompleteCtx = { otherId: '123' };
        assert.equal(rule.matches(mockPath, incompleteCtx), false);
        
        done();
    });
});