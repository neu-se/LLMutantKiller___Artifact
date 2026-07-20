let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for with empty spec', function(done) {
        try {
            // Test with an empty spec object
            const spec = {};
            
            const matcher = _spacl_core.Matcher.for(spec, '1.1');
            
            // Verify that a matcher object is returned even with empty spec
            assert(matcher !== null, 'Matcher should not be null for empty spec');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })