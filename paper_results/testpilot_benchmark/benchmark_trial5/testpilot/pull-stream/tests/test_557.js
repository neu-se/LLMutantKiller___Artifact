let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.collect with transformed data', function(done) {
        pull_stream(
            pull_stream.values([1, 2, 3]),
            pull_stream.map(x => x * 2),
            pull_stream.collect(function(err, results) {
                assert.ifError(err);
                assert.deepEqual(results, [2, 4, 6]);
                done();
            })
        );
    });
});