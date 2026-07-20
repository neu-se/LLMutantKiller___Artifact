let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.unique - empty stream', function(done) {
        pull_stream(
            pull_stream.values([]),
            pull_stream.unique(),
            pull_stream.collect(function(err, result) {
                assert.ifError(err);
                assert.deepEqual(result, []);
                done();
            })
        );
    });
});