let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.onEnd with error in stream', function(done) {
        let testError = new Error('Test error');
        
        pull_stream(
            pull_stream.error(testError),
            pull_stream.onEnd(function(err) {
                assert.strictEqual(err, testError, 'Should receive the error from the stream');
                done();
            })
        );
    });
});