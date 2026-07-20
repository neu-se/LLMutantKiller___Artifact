let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.reduce without initial accumulator', function(done) {
        pull_stream(
            pull_stream.values([1, 2, 3, 4, 5]),
            pull_stream.reduce(function(acc, data) {
                return acc + data;
            }, 0, function(err, result) {
                assert.equal(err, null);
                assert.equal(result, 15);
                done();
            })
        );
    });
});