let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.collect with empty stream', function(done) {
        pull_stream(
            pull_stream.values([]),
            pull_stream.collect(function(err, results) {
                assert.ifError(err);
                assert.deepEqual(results, []);
                done();
            })
        );
    });
});