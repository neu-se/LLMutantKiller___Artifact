let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should handle abort', function(done) {
        let values = [];
        let source = pull_stream.values([1, 2, 3, 4, 5]);
        let drain = pull_stream.drain(
            function(data) {
                values.push(data);
                if (data === 2) {
                    return false; // This aborts the stream
                }
            },
            function(err) {
                assert.strictEqual(err, null);
                assert.deepEqual(values, [1, 2]);
                done();
            }
        );
        pull_stream(source, drain);
    });
});