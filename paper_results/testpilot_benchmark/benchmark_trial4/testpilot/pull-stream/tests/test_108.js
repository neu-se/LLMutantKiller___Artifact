let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.count with max of 1', function(done) {
        pull_stream(
            pull_stream.count(1),
            pull_stream.collect(function(err, results) {
                assert.ifError(err);
                assert.deepEqual(results, [0]);
                done();
            })
        );
    });

    })