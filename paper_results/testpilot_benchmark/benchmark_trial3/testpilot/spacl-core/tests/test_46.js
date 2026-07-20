let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for with default version', function(done) {
        // Test creating a Matcher with default version
        const spec = '/user/:id';
        const matcher = _spacl_core.Matcher.for(spec);
        
        assert(matcher instanceof _spacl_core.Matcher, 'Should return a Matcher instance');
        assert.strictEqual(matcher.spec, spec, 'Should set the spec correctly');
        assert.strictEqual(matcher.version, '1.1', 'Should use default version 1.1');
        done();
    });
});