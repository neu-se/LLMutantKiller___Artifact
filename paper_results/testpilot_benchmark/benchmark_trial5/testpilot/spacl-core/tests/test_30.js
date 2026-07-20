let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher.for with complex spec', function(done) {
        try {
            // Test with a more complex spec object
            const spec = {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    age: { type: 'number', min: 0 }
                },
                required: ['name']
            };
            const matcher = _spacl_core.Matcher.for(spec, '1.1');
            
            // Verify that a matcher object is returned
            assert(matcher !== null, 'Matcher should not be null');
            assert(typeof matcher === 'object', 'Matcher should be an object');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});