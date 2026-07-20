let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.take with predicate function', function(done) {
        let result = [];
        pull_stream(
            pull_stream.values([1, 2, 3, 4, 5]),
            pull_stream.take(function(item) {
                return item < 4;
            }),
            pull_stream.collect(function(err, data) {
                assert.ifError(err);
                assert.deepEqual(data, [1, 2, 3]);
                done();
            })
        );
    });
});