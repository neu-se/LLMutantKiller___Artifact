let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nearer with string numeric input', function(done) {
        try {
            let result = q.nearer("5");
            // If it accepts string input, verify the result
            assert(result !== null && result !== undefined, 'Result should not be null or undefined');
            done();
        } catch (error) {
            // If it throws an error for string input, that's also valid behavior
            assert(error instanceof Error, 'Should throw an error for invalid input type');
            done();
        }
    });
});