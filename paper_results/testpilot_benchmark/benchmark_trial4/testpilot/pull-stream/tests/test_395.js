let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.flatten with mixed types', function(done) {
        pull_stream(
            pull_stream.values([
                [1, 2],
                pull_stream.values([3, 4]),
                5,
                [6, 7]
            ]),
            pull_stream.flatten(),
            pull_stream.collect(function (err, numbers) {
                assert.deepEqual([1, 2, 3, 4, 5, 6, 7], numbers);
                done();
            })
        );
    });

    })