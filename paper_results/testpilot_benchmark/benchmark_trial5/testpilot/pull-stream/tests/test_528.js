let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.reduce with empty stream and no initial accumulator', function(done) {
        pull_stream(
            pull_stream.values([]),
            pull_stream.reduce(function(acc, data) {
                return acc + data;
            }),
            pull_stream.drain(function(result) {
                assert.equal(result, undefined);
                done();
            }, function(err) {
                if (err) {
                    done(err);
                } else {
                    done();
                }
            })
        );
    });
});