let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.flatten with single values', function(done) {
        pull_stream(
            pull_stream.values([
                1,
                2,
                3
            ]),
            pull_stream.flatten(),
            pull_stream.collect(function (err, numbers) {
                assert.deepEqual([1, 2, 3], numbers);
                done();
            })
        );
    });
});