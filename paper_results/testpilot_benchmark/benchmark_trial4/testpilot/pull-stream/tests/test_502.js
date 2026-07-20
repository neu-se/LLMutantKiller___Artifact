let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.find - handles empty stream', function(done) {
        pull_stream(
            pull_stream.values([]),
            pull_stream.find(x => true),
            pull_stream.collect((err, results) => {
                assert.strictEqual(err, null);
                assert.strictEqual(results.length, 0);
                done();
            })
        );
    });
});