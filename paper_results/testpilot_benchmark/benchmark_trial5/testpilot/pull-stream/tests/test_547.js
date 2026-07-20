let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.collect with single item', function(done) {
        pull_stream(
            pull_stream.values([42]),
            pull_stream.collect(function(err, result) {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(result, [42]);
                done();
            })
        );
    });
});