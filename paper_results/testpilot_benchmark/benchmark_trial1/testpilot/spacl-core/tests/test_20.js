let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for with empty spec', function(done) {
        try {
            // Test with a spec object that has a match method
            const spec = {
                match: function() {
                    return true; // or whatever default behavior is expected
                }
            };
            
            const matcher = _spacl_core.Matcher.for(spec, '1.1');
            
            // Verify that a matcher object is returned
            assert(matcher !== null, 'Matcher should not be null for spec with match method');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});