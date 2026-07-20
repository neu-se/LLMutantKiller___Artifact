let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values with take', function(done) {
        pull_stream(
            pull_stream.values([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            pull_stream.take(3),
            pull_stream.collect(function (err, results) {
                assert.strictEqual(err, null);
                assert.deepEqual(results, [1, 2, 3]);
                done();
            })
        );
    });
});