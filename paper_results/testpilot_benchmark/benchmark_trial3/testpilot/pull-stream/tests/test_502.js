let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.reduce with empty stream and initial accumulator', function(done) {
        pull_stream(
            pull_stream.values([]),
            pull_stream.reduce(function(acc, data) {
                return acc + data;
            }, 10, function(err, result) {
                assert.equal(err, null);
                assert.equal(result, 10);
                done();
            })
        );
    });
});