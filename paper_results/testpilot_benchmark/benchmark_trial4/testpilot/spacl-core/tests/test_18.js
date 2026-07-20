let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for with custom version', function(done) {
        // Test that Matcher.for creates a new Matcher instance with custom version
        let spec = { type: 'custom', pattern: 'test' };
        let customVersion = '2.0';
        let matcher = _spacl_core.Matcher.for(spec, customVersion);
        
        assert(matcher instanceof _spacl_core.Matcher, 'Should return a Matcher instance');
        assert.strictEqual(matcher.version, customVersion, 'Should use the provided custom version');
        assert.strictEqual(matcher.spec, spec, 'Should store the provided spec');
        done();
    });

    })