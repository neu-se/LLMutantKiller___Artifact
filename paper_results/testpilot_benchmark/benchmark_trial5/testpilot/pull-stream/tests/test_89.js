let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values with string array and take', function(done) {
        pull_stream(
            pull_stream.values(['a', 'b', 'c', 'd', 'e']),
            pull_stream.take(3),
            pull_stream.collect(function (err, results) {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(results, ['a', 'b', 'c']);
                done();
            })
        );
    });
});