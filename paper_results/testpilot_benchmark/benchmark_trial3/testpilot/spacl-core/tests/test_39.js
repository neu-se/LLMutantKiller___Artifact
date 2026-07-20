let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for with empty spec', function(done) {
        // Test creating a Matcher with empty spec
        const spec = '';
        const matcher = _spacl_core.Matcher.for(spec);
        
        assert(matcher instanceof _spacl_core.Matcher, 'Should return a Matcher instance');
        assert.strictEqual(matcher.spec, spec, 'Should handle empty spec');
        assert.strictEqual(matcher.version, '1.1', 'Should use default version');
        done();
    });

    })