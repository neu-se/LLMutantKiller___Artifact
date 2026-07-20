let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.find - finds first matching element', function(done) {
        pull_stream(
            pull_stream.values([1, 2, 3, 4, 5]),
            pull_stream.find(x => x > 3),
            pull_stream.drain((result) => {
                assert.strictEqual(result, 4);
                done();
            }, (err) => {
                if (err) done(err);
            })
        );
    });
});