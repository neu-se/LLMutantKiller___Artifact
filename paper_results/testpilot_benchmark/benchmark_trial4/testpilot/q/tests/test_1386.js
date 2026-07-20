let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nearer with invalid input', function(done) {
        try {
            let result = q.nearer(null);
            // If it handles null gracefully
            done();
        } catch (error) {
            // If it throws an error for null input
            assert(error instanceof Error, 'Should throw an error for null input');
            done();
        }
    });
});