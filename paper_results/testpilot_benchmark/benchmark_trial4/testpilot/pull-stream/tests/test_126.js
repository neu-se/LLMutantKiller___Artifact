let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.count with max limit', function(done) {
        pull_stream(
            pull_stream.count(3),
            pull_stream.collect(function(err, results) {
                assert.ifError(err);
                assert.deepEqual(results, [0, 1, 2]);
                done();
            })
        );
    });
});