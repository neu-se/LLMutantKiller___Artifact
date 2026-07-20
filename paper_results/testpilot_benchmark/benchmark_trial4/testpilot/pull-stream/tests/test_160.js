let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.empty works with collect', function(done) {
        pull_stream(
            pull_stream.empty(),
            pull_stream.collect(function(err, results) {
                assert.strictEqual(err, null);
                assert.strictEqual(Array.isArray(results), true);
                assert.strictEqual(results.length, 0);
                done();
            })
        );
    });
});