let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should work without op function', function(done) {
        let source = pull_stream.values([1, 2, 3]);
        let sink = pull_stream.drain(
            null,
            function(err) {
                assert.strictEqual(err, null);
                done();
            }
        );
        pull_stream(source, sink);
    });
});