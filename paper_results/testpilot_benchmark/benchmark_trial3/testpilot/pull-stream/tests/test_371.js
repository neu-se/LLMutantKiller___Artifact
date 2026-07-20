let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with empty stream', function(done) {
        pull_stream(
            pull_stream.values([]),
            pull_stream.nonUnique(),
            pull_stream.collect(function(err, data) {
                if (err) return done(err);
                assert.deepEqual(data, []);
                done();
            })
        );
    });
});