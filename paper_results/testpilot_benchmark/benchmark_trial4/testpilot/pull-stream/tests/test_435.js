let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should drain all values from a stream', function(done) {
        let values = [];
        let source = pull_stream.values([1, 2, 3, 4, 5]);
        let sink = pull_stream.drain(
            function(data) {
                values.push(data);
            },
            function(err) {
                assert.strictEqual(err, null);
                assert.deepEqual(values, [1, 2, 3, 4, 5]);
                done();
            }
        );
        pull_stream(source, sink);
    });
});