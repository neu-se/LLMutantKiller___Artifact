let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.take with predicate function and last: false', function(done) {
        pull_stream(
            pull_stream.values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            pull_stream.take(n => n < 4.6, { last: false }),
            pull_stream.collect((err, data) => {
                assert.ifError(err);
                assert.deepEqual(data, [1, 2, 3, 4]);
                done();
            })
        );
    });
});