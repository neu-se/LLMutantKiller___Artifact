let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.count with large max value', function(done) {
        pull_stream(
            pull_stream.count(100),
            pull_stream.take(10),
            pull_stream.collect(function(err, results) {
                assert.ifError(err);
                assert.deepEqual(results, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
                done();
            })
        );
    });
});