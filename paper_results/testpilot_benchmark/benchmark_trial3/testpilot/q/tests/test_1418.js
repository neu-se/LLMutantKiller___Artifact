let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.resetUnhandledRejections - should return undefined', function(done) {
        try {
            let result = q.resetUnhandledRejections();
            assert.strictEqual(result, undefined, 'resetUnhandledRejections should return undefined');
            done();
        } catch (error) {
            done(error);
        }
    });
});