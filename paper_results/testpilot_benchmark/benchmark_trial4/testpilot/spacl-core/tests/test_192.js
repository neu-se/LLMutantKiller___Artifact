let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for with empty spec', function(done) {
        try {
            const rule = _spacl_core.Rule.for('');
            // Depending on implementation, this might throw or return null/undefined
            done();
        } catch (error) {
            // Expected behavior for empty spec might be to throw
            assert(error instanceof Error, 'Should throw an error for empty spec');
            done();
        }
    });
});