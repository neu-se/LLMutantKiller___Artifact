let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with empty stream', function(done) {
        let input = [];
        let expected = [];
        
        pull_stream(
            pull_stream.values(input),
            pull_stream.nonUnique(),
            pull_stream.collect(function(err, data) {
                if (err) return done(err);
                assert.deepEqual(data, expected);
                done();
            })
        );
    });
});