let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.count with max value of 0', function(done) {
        pull_stream(
            pull_stream.count(0),
            pull_stream.collect(function(err, data) {
                assert.ifError(err);
                assert.deepEqual(data, [0]);
                done();
            })
        );
    });

    })