let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.reduce with sum operation', function(done) {
        pull_stream(
            pull_stream.values([1, 2, 3, 4, 5]),
            pull_stream.reduce((acc, val) => acc + val, 0, (err, result) => {
                assert.strictEqual(err, null);
                assert.strictEqual(result, 15);
                done();
            })
        );
    });
});