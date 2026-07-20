let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.find - works with empty stream', function(done) {
        pull_stream(
            pull_stream.values([]),
            pull_stream.find(x => true, (err, result) => {
                assert.strictEqual(err, null);
                assert.strictEqual(result, null);
                done();
            })
        );
    });
});