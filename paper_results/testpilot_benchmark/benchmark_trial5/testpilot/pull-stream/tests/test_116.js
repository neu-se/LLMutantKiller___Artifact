let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.count with negative max (treated as 0)', function(done) {
        pull_stream(
            pull_stream.count(-1),
            pull_stream.collect(function(err, data) {
                assert.ifError(err);
                // Should immediately end since i (0) > max (-1)
                assert.deepEqual(data, []);
                done();
            })
        );
    });
});