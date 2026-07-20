let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher', function(done) {
        // Test valid path specification
        let matcher1 = new _spacl_core.Matcher('/api/users');
        assert.strictEqual(matcher1.spec, '/api/users');
        assert.strictEqual(matcher1 instanceof RegExp, true);

        // Test static constructor
        let matcher2 = _spacl_core.Matcher.for('/api/posts');
        assert.strictEqual(matcher2.spec, '/api/posts');
        assert.strictEqual(matcher2 instanceof _spacl_core.Matcher, true);

        // Test version parameter
        let matcher3 = new _spacl_core.Matcher('/api/data', '1.0');
        assert.strictEqual(matcher3.spec, '/api/data');

        // Test invalid characters
        assert.throws(() => {
            new _spacl_core.Matcher('/api/users@invalid');
        }, /Path contains invalid characters/);

        // Test path must begin with slash
        assert.throws(() => {
            new _spacl_core.Matcher('api/users');
        }, /Path must begin with a slash/);

        // Test empty segments
        assert.throws(() => {
            new _spacl_core.Matcher('/api//users');
        }, /Path contains empty segments/);

        // Test malformed wildcards for version 1.1
        assert.throws(() => {
            new _spacl_core.Matcher('/api/*invalid', '1.1');
        }, /Path contains malformed wildcards/);

        // Test malformed captures
        assert.throws(() => {
            new _spacl_core.Matcher('/api:invalid');
        }, /Path contains malformed captures/);

        assert.throws(() => {
            new _spacl_core.Matcher('/api/users:');
        }, /Path contains malformed captures/);

        // Test path ending with slash
        assert.throws(() => {
            new _spacl_core.Matcher('/api/users/');
        }, /Path must not end with a slash/);

        // Test Symbol.match behavior
        let matcher4 = new _spacl_core.Matcher('/test');
        // Should return null for strings ending with slash (length > 1)
        assert.strictEqual(matcher4[Symbol.match]('/test/'), null);
        
        done();
    });
});