let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with all unique values', function(done) {
        let input = [1, 2, 3, 4, 5];
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