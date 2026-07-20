let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.take with predicate that never matches', function(done) {
        pull_stream(
            pull_stream.values([1, 2, 3]),
            pull_stream.take(function(item) {
                return item > 10;
            }),
            pull_stream.collect(function(err, data) {
                assert.ifError(err);
                assert.deepEqual(data, []);
                done();
            })
        );
    });
});