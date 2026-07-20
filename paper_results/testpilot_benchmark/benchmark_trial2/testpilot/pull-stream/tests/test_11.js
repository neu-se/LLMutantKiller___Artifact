let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.count with default behavior', function(done) {
        pull_stream(
            pull_stream.count(),
            pull_stream.take(5),
            pull_stream.collect(function(err, results) {
                assert.ifError(err);
                assert.deepEqual(results, [0, 1, 2, 3, 4]);
                done();
            })
        );
    });

    })