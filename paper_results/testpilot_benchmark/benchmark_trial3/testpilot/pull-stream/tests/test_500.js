let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.reduce with string concatenation', function(done) {
        pull_stream(
            pull_stream.values(['hello', ' ', 'world']),
            pull_stream.reduce(function(acc, data) {
                return acc + data;
            }, '', function(err, result) {
                assert.equal(err, null);
                assert.equal(result, 'hello world');
                done();
            })
        );
    });
});