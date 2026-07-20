let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.concat with single item', function(done) {
        pull_stream(
            pull_stream.values(['single']),
            pull_stream.concat(function(err, result) {
                assert.strictEqual(err, null);
                assert.strictEqual(result, 'single');
                done();
            })
        );
    });
});