let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for with complex path pattern', function(done) {
        // Test creating a Matcher with complex path pattern
        const spec = '/organization/:orgId/users/:userId/permissions/+';
        const version = '1.5';
        const matcher = _spacl_core.Matcher.for(spec, version);
        
        assert(matcher instanceof _spacl_core.Matcher, 'Should return a Matcher instance');
        assert.strictEqual(matcher.spec, spec, 'Should handle complex path patterns');
        assert.strictEqual(matcher.version, version, 'Should use the provided version');
        done();
    });

    })