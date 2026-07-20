let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.asyncMap with error handling', function(done) {
        const source = pull_stream.values([1, 2, 3]);
        const asyncMapWithError = pull_stream.asyncMap((value, callback) => {
            setTimeout(() => {
                if (value === 2) {
                    callback(new Error('Test error'));
                } else {
                    callback(null, value * 10);
                }
            }, 5);
        });
        
        pull_stream(
            source,
            asyncMapWithError,
            pull_stream.drain(
                (data) => {
                    // Should not reach here due to error
                    assert.fail('Should not receive data after error');
                },
                (err) => {
                    assert(err instanceof Error);
                    assert.equal(err.message, 'Test error');
                    done();
                }
            )
        );
    });
});