let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should stop draining when op returns false', function(done) {
        let values = [];
        let source = pull_stream.values([1, 2, 3, 4, 5]);
        let sink = pull_stream.drain(
            function(data) {
                values.push(data);
                return data < 3; // Stop when we reach 3
            },
            function(err) {
                assert.strictEqual(err, null);
                assert.deepEqual(values, [1, 2, 3]);
                done();
            }
        );
        pull_stream(source, sink);
    });
});