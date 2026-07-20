let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.map with square function', function(done) {
        let results = [];
        pull_stream(
            pull_stream.values([0, 1, 2, 3]),
            pull_stream.map(function (x) {
                return x * x;
            }),
            pull_stream.drain(function(value) {
                results.push(value);
            }, function(err) {
                if (err) return done(err);
                assert.deepEqual(results, [0, 1, 4, 9]);
                done();
            })
        );
    });
});