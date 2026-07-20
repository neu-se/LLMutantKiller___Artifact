let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test query method', function(done) {
        const rule = new _spacl_core.Rule('/api/users/*');
        rule.allow('read').deny('write');
        
        // Mock the matches method to return true for testing
        rule.matches = function(path, ctx) {
            return path.startsWith('/api/users/');
        };
        
        // Test allowed verb
        assert.equal(rule.query('/api/users/123', 'read'), true);
        
        // Test denied verb
        assert.equal(rule.query('/api/users/123', 'write'), false);
        
        // Test unknown verb
        assert.equal(rule.query('/api/users/123', 'delete'), null);
        
        // Test non-matching path
        rule.matches = function(path, ctx) {
            return false;
        };
        assert.equal(rule.query('/api/posts/123', 'read'), null);
        
        done();
    });
});