let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should handle stream errors', function(done) {
        const testError = new Error('test error');
        
        pull_stream(
            pull_stream.error(testError),
            pull_stream.drain(null, (err) => {
                assert.strictEqual(err, testError);
                done();
            })
        );
    });
});