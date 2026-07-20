let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.take with count larger than stream', function(done) {
        pull_stream(
            pull_stream.values(['a', 'b']),
            pull_stream.take(5),
            pull_stream.collect((err, data) => {
                assert.ifError(err);
                assert.deepEqual(data, ['a', 'b']);
                done();
            })
        );
    });
});