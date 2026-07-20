let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.noConflict throws error when used as module', function(done) {
        try {
            q.noConflict();
            // If we reach this line, the function didn't throw an error
            done(new Error('Expected q.noConflict() to throw an error'));
        } catch (error) {
            assert.strictEqual(error.message, "Q.noConflict only works when Q is used as a global");
            done();
        }
    });
});