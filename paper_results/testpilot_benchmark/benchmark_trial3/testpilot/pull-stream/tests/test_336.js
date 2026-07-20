let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.unique - single element', function(done) {
        pull_stream(
            pull_stream.values([42]),
            pull_stream.unique(),
            pull_stream.collect(function(err, result) {
                assert.ifError(err);
                assert.deepEqual(result, [42]);
                done();
            })
        );
    });

    })