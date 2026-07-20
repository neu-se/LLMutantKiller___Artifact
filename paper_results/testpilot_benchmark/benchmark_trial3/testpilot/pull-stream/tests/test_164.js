let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.error with custom error object', function(done) {
        const testError = { code: 'CUSTOM_ERROR', message: 'Custom error occurred' };
        const errorStream = pull_stream.error(testError);
        
        errorStream(false, function(err) {
            assert.strictEqual(err, testError);
            assert.strictEqual(err.code, 'CUSTOM_ERROR');
            assert.strictEqual(err.message, 'Custom error occurred');
            done();
        });
    });
});