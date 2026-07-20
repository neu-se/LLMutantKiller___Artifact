let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.find - returns null when no match found', function(done) {
        pull_stream(
            pull_stream.values([1, 2, 3]),
            pull_stream.find(x => x > 10),
            pull_stream.drain((result) => {
                assert.strictEqual(result, null);
                done();
            }, (err) => {
                if (err) return done(err);
            })
        );
    });
});