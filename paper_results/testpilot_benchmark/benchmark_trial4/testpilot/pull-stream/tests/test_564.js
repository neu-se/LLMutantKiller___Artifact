let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.concat with numeric strings', function(done) {
        pull_stream(
            pull_stream.values(['1', '2', '3']),
            pull_stream.concat(function(err, result) {
                assert.strictEqual(err, null);
                assert.strictEqual(result, '123');
                done();
            })
        );
    });
});