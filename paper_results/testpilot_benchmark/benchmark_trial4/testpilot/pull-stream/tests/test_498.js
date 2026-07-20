let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should use identity function when only callback provided', function(done) {
        pull_stream(
            pull_stream.values([false, 0, '', 'found', 'second']),
            pull_stream.find((err, result) => {
                assert.strictEqual(err, null);
                assert.strictEqual(result, 'found');
                done();
            })
        );
    });
});