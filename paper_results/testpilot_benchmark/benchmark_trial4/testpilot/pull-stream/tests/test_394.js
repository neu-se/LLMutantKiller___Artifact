let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.flatten with stream of streams', function(done) {
        pull_stream(
            pull_stream.values([
                pull_stream.values([1, 2, 3]),
                pull_stream.values([4, 5, 6]),
                pull_stream.values([7, 8, 9])
            ]),
            pull_stream.flatten(),
            pull_stream.collect(function (err, numbers) {
                assert.deepEqual([1, 2, 3, 4, 5, 6, 7, 8, 9], numbers);
                done();
            })
        );
    });

    })