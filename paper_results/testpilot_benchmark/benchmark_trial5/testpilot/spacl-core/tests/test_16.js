let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test malformed wildcards error', function() {
        // Test version 1.0/1 wildcard validation
        assert.throws(() => {
            new _spacl_core.Matcher('/api/*users', '1.0');
        }, /Path contains malformed wildcards/);
        
        assert.throws(() => {
            new _spacl_core.Matcher('/api/users*', '1');
        }, /Path contains malformed wildcards/);
        
        // Test version 1.1 wildcard validation
        assert.throws(() => {
            new _spacl_core.Matcher('/api/*users');
        }, /Path contains malformed wildcards/);
        
        assert.throws(() => {
            new _spacl_core.Matcher('/api/***');
        }, /Path contains malformed wildcards/);
        
        assert.throws(() => {
            new _spacl_core.Matcher('/api/+++');
        }, /Path contains malformed wildcards/);
    });
});