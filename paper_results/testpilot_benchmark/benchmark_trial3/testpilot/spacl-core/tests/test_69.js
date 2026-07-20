let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test matches method', function(done) {
        const rule = new _spacl_core.Rule('/api/users/*');
        
        // Mock the regex and its match method
        rule.regex = {
            props: [],
            match: function(path) {
                if (path === '/api/users/123') {
                    return ['123'];
                }
                return null;
            }
        };
        
        // Override the match method to simulate string match
        String.prototype.match = function(regex) {
            return regex.match(this);
        };
        
        // Test matching path
        assert.equal(rule.matches('/api/users/123'), true);
        
        // Test non-matching path
        assert.equal(rule.matches('/api/posts/123'), false);
        
        // Test with context properties
        rule.regex.props = ['userId'];
        rule.regex.match = function(path) {
            if (path === '/api/users/123') {
                return ['123', '123'];
            }
            return null;
        };
        
        // Test with matching context
        assert.equal(rule.matches('/api/users/123', { userId: '123' }), true);
        
        // Test with non-matching context
        assert.equal(rule.matches('/api/users/123', { userId: '456' }), false);
        
        // Test with missing context
        assert.equal(rule.matches('/api/users/123'), false);
        
        done();
    });
});