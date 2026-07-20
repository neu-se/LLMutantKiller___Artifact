let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test matches method with context', function(done) {
        const rule = new _spacl_core.Rule('/api/users/*');
        
        // Mock regex with props that require context
        rule.regex = {
            props: ['userId'],
            test: function() { return true; }
        };
        
        const mockPath = {
            match: function(regex) {
                if (this.path === '/api/users/123') {
                    return [this.path, '123']; // Full match, then captured group
                }
                return null;
            },
            path: '/api/users/123'
        };
        
        // Test with matching context
        const ctx = { userId: '123' };
        assert.equal(rule.matches(mockPath, ctx), true);
        
        // Test with non-matching context
        const wrongCtx = { userId: '456' };
        assert.equal(rule.matches(mockPath, wrongCtx), false);
        
        // Test with missing context
        assert.equal(rule.matches(mockPath), false);
        
        done();
    });

    })