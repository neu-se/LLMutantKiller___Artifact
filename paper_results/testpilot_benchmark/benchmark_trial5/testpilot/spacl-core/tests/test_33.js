let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for with null spec', function(done) {
        // Test that Matcher.for handles null spec
        const matcher = _spacl_core.Matcher.for(null);
        
        assert(matcher instanceof _spacl_core.Matcher, 'Should return a Matcher instance');
        assert.strictEqual(matcher.spec, null, 'Should handle null spec');
        assert.strictEqual(matcher.version, '1.1', 'Should use default version');
        done();
    });

    })