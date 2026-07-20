let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with primitive values', function(done) {
        pull_stream(
            pull_stream.values([1, 2, 2, 3, 3, 3, 4]),
            pull_stream.nonUnique(),
            pull_stream.collect(function(err, result) {
                assert.ifError(err);
                // Should return only the duplicate values
                assert.deepEqual(result, [2, 3, 3]);
                done();
            })
        );
    });
});