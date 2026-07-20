let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.count with max value of 3', function(done) {
        let results = [];
        pull_stream(
            pull_stream.count(3),
            pull_stream.collect(function(err, data) {
                assert.ifError(err);
                assert.deepEqual(data, [0, 1, 2, 3]);
                done();
            })
        );
    });
});