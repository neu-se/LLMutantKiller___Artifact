let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.take with zero count', function(done) {
        pull_stream(
            pull_stream.values(['a', 'b', 'c']),
            pull_stream.take(0),
            pull_stream.collect((err, data) => {
                assert.ifError(err);
                assert.deepEqual(data, []);
                done();
            })
        );
    });

    })