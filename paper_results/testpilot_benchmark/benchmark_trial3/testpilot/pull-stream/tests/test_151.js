let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.empty - should work with collect', function(done) {
        pull_stream(
            pull_stream.empty(),
            pull_stream.collect(function(err, results) {
                assert.strictEqual(err, null, 'Should not have an error');
                assert.strictEqual(Array.isArray(results), true, 'Results should be an array');
                assert.strictEqual(results.length, 0, 'Results array should be empty');
                done();
            })
        );
    });
});