let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.error - should emit error to sink', function(done) {
        const testError = new Error('Test error message');
        
        pull_stream(
            pull_stream.error(testError),
            pull_stream.drain(
                function(data) {
                    // Should not receive any data
                    done(new Error('Should not receive data'));
                },
                function(err) {
                    // Should receive the error
                    assert.strictEqual(err, testError);
                    assert.strictEqual(err.message, 'Test error message');
                    done();
                }
            )
        );
    });
});