let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for with empty spec', function(done) {
        try {
            // Test with an empty spec object
            const spec = {};
            const matcher = _spacl_core.Matcher.for(spec);
            
            // Should handle empty spec gracefully
            assert(matcher !== null, 'Matcher should not be null even with empty spec');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })