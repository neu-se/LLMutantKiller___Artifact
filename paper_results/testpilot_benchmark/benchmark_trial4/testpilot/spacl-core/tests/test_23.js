let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for with default version', function(done) {
        // Test creating a Matcher with default version
        const spec = '/user/:id';
        const matcher = _spacl_core.Matcher.for(spec);
        
        // Verify that a Matcher instance is returned
        assert(matcher instanceof _spacl_core.Matcher, 'Should return a Matcher instance');
        
        // Verify that the matcher was created with the correct spec
        assert.strictEqual(matcher.spec, spec, 'Should store the provided spec');
        
        // Verify that the default version is used
        assert.strictEqual(matcher.version, '1.1', 'Should use default version 1.1');
        
        done();
    });

    })