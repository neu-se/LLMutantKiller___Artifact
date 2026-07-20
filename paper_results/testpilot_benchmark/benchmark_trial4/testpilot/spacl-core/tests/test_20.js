let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for with empty object spec', function(done) {
        // Test that Matcher.for handles empty object spec
        let emptySpec = {};
        let matcher = _spacl_core.Matcher.for(emptySpec);
        
        assert(matcher instanceof _spacl_core.Matcher, 'Should return a Matcher instance');
        assert.strictEqual(matcher.version, '1.1', 'Should use default version 1.1');
        assert.deepStrictEqual(matcher.spec, emptySpec, 'Should store the empty spec object');
        done();
    });

    })