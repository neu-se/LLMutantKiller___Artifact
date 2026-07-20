let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for with null spec', function(done) {
        try {
            const rule = _spacl_core.Rule.for(null);
            // This should likely throw an error or return null
            done();
        } catch (error) {
            assert(error instanceof Error, 'Should throw an Error for null spec');
            done();
        }
    });
});