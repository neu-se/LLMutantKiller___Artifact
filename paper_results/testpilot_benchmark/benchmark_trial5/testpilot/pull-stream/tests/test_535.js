let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.reduce with array concatenation', function(done) {
        pull_stream(
            pull_stream.values(['a', 'b', 'c']),
            pull_stream.reduce((acc, val) => acc.concat(val), [], (err, result) => {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(result, ['a', 'b', 'c']);
                done();
            })
        );
    });
});