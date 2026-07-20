let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.take with count larger than stream', function(done) {
        pull_stream(
            pull_stream.values([1, 2, 3]),
            pull_stream.take(10),
            pull_stream.collect(function(err, data) {
                assert.ifError(err);
                assert.deepEqual(data, [1, 2, 3]);
                done();
            })
        );
    });
});