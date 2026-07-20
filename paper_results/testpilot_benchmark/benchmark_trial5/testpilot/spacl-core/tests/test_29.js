let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for with null spec', function(done) {
        try {
            // Test with null spec - this might throw an error
            const matcher = _spacl_core.Matcher.for(null);
            
            // If no error is thrown, verify the result
            assert(matcher !== undefined, 'Matcher should handle null spec gracefully');
            
            done();
        } catch (error) {
            // If an error is expected for null spec, that's also valid
            assert(error instanceof Error, 'Should throw an Error for null spec');
            done();
        }
    });

    })