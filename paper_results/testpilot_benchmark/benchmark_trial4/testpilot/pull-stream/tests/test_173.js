let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.error ignores abort parameter', function(done) {
        const testError = new Error('Abort test');
        const errorStream = pull_stream.error(testError);
        
        // Test with abort = true
        errorStream(true, function(err) {
            assert.strictEqual(err, testError);
            done();
        });
    });
});