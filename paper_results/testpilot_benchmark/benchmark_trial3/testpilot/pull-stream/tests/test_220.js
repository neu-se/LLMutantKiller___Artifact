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
        
        const results = [];
        pull_stream(
            source,
            asyncMapWithError,
            pull_stream.drain(
                (data) => results.push(data),
                (err) => {
                    assert(err instanceof Error);
                    assert.equal(err.message, 'Test error');
                    assert.deepEqual(results, [10]); // Only first value processed before error
                    done();
                }
            )
        );
    });
});