let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.count with default max (Infinity)', function(done) {
        let results = [];
        pull_stream(
            pull_stream.count(),
            pull_stream.take(5), // Take only first 5 values to avoid infinite loop
            pull_stream.collect(function(err, data) {
                assert.equal(err, null);
                assert.deepEqual(data, [0, 1, 2, 3, 4]);
                done();
            })
        );
    });

    })