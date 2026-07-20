let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should handle empty stream', function(done) {
        pull_stream(
            pull_stream.values([]),
            pull_stream.collect(function(err, data) {
                assert.equal(err, null);
                assert.deepEqual(data, []);
                done();
            })
        );
    });
});