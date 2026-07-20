let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should handle empty stream', function(done) {
        pull_stream(
            pull_stream.values([]),
            pull_stream.find(x => x > 0),
            pull_stream.drain(null, (err) => {
                assert.strictEqual(err, null);
                done();
            })
        );
    });
});