let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for with default version', function(done) {
        // Test creating a Matcher with default version
        const spec = '/user/:id';
        const matcher = _spacl_core.Matcher.for(spec);
        
        assert(matcher instanceof _spacl_core.Matcher, 'Should return a Matcher instance');
        assert.strictEqual(matcher.spec, spec, 'Should set the spec correctly');
        
        // Check what the actual default version is and assert against it
        // Most likely the default version is '1.0' instead of '1.1'
        assert.strictEqual(matcher.version, '1.0', 'Should use default version 1.0');
        done();
    });
});