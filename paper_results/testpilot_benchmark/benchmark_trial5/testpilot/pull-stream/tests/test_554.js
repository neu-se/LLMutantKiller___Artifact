let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.collect with single value', function(done) {
        pull_stream(
            pull_stream.values([42]),
            pull_stream.collect(function(err, results) {
                assert.ifError(err);
                assert.deepEqual(results, [42]);
                done();
            })
        );
    });
});