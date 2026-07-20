let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should handle empty streams', function(done) {
        let values = [];
        let source = pull_stream.values([]);
        let drain = pull_stream.drain(
            function(data) {
                values.push(data);
            },
            function(err) {
                assert.strictEqual(err, null);
                assert.deepEqual(values, []);
                done();
            }
        );
        pull_stream(source, drain);
    });
});