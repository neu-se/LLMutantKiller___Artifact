let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with no duplicates', function(done) {
        pull_stream(
            pull_stream.values([1, 2, 3, 4, 5]),
            pull_stream.nonUnique(),
            pull_stream.collect(function(err, result) {
                assert.ifError(err);
                assert.deepEqual(result, []);
                done();
            })
        );
    });
});