let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.drain without operation function', function(done) {
        pull_stream(
            pull_stream.values([1, 2, 3]),
            pull_stream.drain(
                null,
                function(err) {
                    assert.strictEqual(err, null);
                    done();
                }
            )
        );
    });
});