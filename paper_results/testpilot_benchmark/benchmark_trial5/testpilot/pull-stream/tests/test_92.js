let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values with empty array', function(done) {
        pull_stream(
            pull_stream.values([]),
            pull_stream.collect(function (err, results) {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(results, []);
                done();
            })
        );
    });
});