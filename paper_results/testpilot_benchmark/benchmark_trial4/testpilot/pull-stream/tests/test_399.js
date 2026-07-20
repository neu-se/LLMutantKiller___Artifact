let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.flatten with empty stream', function(done) {
        pull_stream(
            pull_stream.values([]),
            pull_stream.flatten(),
            pull_stream.collect(function (err, numbers) {
                assert.deepEqual([], numbers);
                done();
            })
        );
    });
});