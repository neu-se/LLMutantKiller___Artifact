let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for with default version', function(done) {
        // Test that Matcher.for creates a new Matcher instance with default version
        let spec = { type: 'test', pattern: 'example' };
        let matcher = _spacl_core.Matcher.for(spec);
        
        assert(matcher instanceof _spacl_core.Matcher, 'Should return a Matcher instance');
        assert.strictEqual(matcher.version, '1.1', 'Should use default version 1.1');
        assert.strictEqual(matcher.spec, spec, 'Should store the provided spec');
        done();
    });

    })